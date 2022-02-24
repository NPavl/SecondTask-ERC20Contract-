const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("Deployment token contract", () => {

    beforeEach(async () => {
        [admin, addr1, addr2, ...addrs] = await ethers.getSigners()
        arg1 = "ERC20token"; arg2 = "BLR"; arg3 = 18
        value = ethers.utils.parseEther('10')
        ERC20token = await ethers.getContractFactory("ERC20token")
        token = await ERC20token.deploy(arg1, arg2, arg3)
        await token.deployed()
    });

    it('set the right owner', async () => {
        actual = await token.admin()

        assert.equal(actual, admin.address, " owner address should match")
    });

    it('set the right arguments', async () => {
        actual1 = await token.name()
        assert.equal(actual1, arg1, "arguments name should match")
        actual2 = await token.symbol()
        assert.equal(actual2, arg2, "arguments symbol should match")
        actual3 = await token.decimals()
        assert.equal(actual3, arg3, "arguments decimals should match")
    })

    it('total supply of tokens must belong to the admin address', async () => {
        await token.connect(admin).mint(admin.address, value)
        adminBalance = await token.balanceOf(admin.address)

        expect(await token.totalSupply()).to.equal(adminBalance)
    })
})

describe("make minting and burning tokens functions", () => {

    beforeEach(async () => {
        [admin, addr1, addr2, ...addrs] = await ethers.getSigners()
        arg1 = "ERC20token"; arg2 = "BLR"; arg3 = 18
        value = ethers.utils.parseEther('10')
        value1 = ethers.utils.parseEther('2')
        value2 = ethers.utils.parseEther('20')
        ERC20token = await ethers.getContractFactory("ERC20token")
        token = await ERC20token.deploy(arg1, arg2, arg3)
        await token.deployed()
        await token.connect(admin).mint(admin.address, value)
    })

    it("permits the admin to call the minting function", async () => {
        try {
            await token.connect(admin).mint(admin.address, value)
            assert(true, "no errors were thrown")
        } catch (err) {
            assert.fail("should not have thrown an error")
        }
    })

    it('throws and error when called minting function from a non-admin account', async () => {
        await expect(
            token.connect(addr1).mint(addr1.address, value))
            .to.be.revertedWith("reverted with reason string 'caller is not the admin'")
    })

    it("permits the admin to call the burning function", async () => {
        try {
            await token.connect(admin).burn(value1)

            assert(true, "no errors were thrown")
        } catch (err) {
            assert.fail("should not have thrown an error")
        }
    })

    it('throws and error when called burning function from a non-admin account', async () => {
        await expect(token.connect(addr1).burn(value1))
            .to.be.revertedWith("reverted with reason string 'caller is not the admin'")
    })

    it('throws and error when called burning function with wrong value', async () => {
        await expect(token.connect(admin).burn(value2)).to.be.revertedWith('Wrong value')
    })

})

describe("Transfer functions", () => {

    beforeEach(async () => {
        [admin, addr1, addr2, ...addrs] = await ethers.getSigners()
        arg1 = "ERC20token"; arg2 = "BLR"; arg3 = 18
        value = ethers.utils.parseEther('10')
        value1 = ethers.utils.parseEther('4')
        value2 = ethers.utils.parseEther('2')
        value3 = ethers.utils.parseEther('6')
        value4 = ethers.utils.parseEther('2')
        ERC20token = await ethers.getContractFactory("ERC20token")
        token = await ERC20token.deploy(arg1, arg2, arg3)
        await token.deployed()
        await token.connect(admin).mint(admin.address, value)
    })

    it('(transfer) transfer tokens to the specified address of the recipient', async () => {
        await token.connect(admin).transfer(addr1.address, value1)
        addr1Balance = await token.balanceOf(addr1.address)

        expect(addr1Balance).to.equal(value1)

        await token.connect(addr1).transfer(addr2.address, value2)
        addr2Balance = await token.balanceOf(addr2.address)

        expect(addr2Balance).to.equal(value2)
    })

    it('Should fail if sender doesn’t have enough tokens', async () => {
        adminBalance = await token.balanceOf(admin.address)
        await expect(token.connect(addr1).transfer(admin.address, value))
            .to.be.revertedWith('Not enough tokens')

        expect(await token.balanceOf(admin.address)).to.equal(adminBalance)
    })

    it('Should update balances after transfers', async () => {
        // const initialOwnerAdminBalance = await token.balanceOf(admin.address)

        await token.connect(admin).transfer(addr1.address, value1)
        const finalOwnerBalance = await token.balanceOf(admin.address)

        expect(finalOwnerBalance).to.equal(value3)
        // expect(finalOwnerBalance).to.equal(initialOwnerAdminBalance - value1) // Error BigNumber 

        await token.connect(addr1).transfer(addr2.address, value2)

        addr1Balance = await token.balanceOf(addr1.address)
        expect(addr1Balance).to.equal(value4)
        // expect(addr1Balance).to.equal(value1 - value2) // Error BigNumber 

        addr2Balance = await token.balanceOf(addr2.address)
        expect(addr2Balance).to.equal(value4)
    })

    it('throws and error when called transferOf function with wrong value', async () => {
        await token.connect(admin).approve(addr1.address, value1)
        await expect(token.connect(addr1).transferFrom(admin.address, addr1.address, value))
            .to.be.revertedWith('Not enough tokens or amount is more than allowed')
    })

    it('should return the number of tokens received through approve function', async () => {
        addr1BalanceBefor = await token.balanceOf(addr1.address)
        await token.connect(admin).approve(addr1.address, value1)

        await expect(token.connect(addr1).transferFrom(admin.address, addr1.address, value2))

        addr1AllowanceBalance = await token.allowance(admin.address, addr1.address)
        expect(addr1AllowanceBalance).to.equal(value1)

        finalAddr1Balance = await token.balanceOf(addr1.address)
        expect(finalAddr1Balance).to.equal(value2)
    })

    it('throws and error if permission to withdraw tokens is not received', async () => {
        await token.connect(admin).approve(addr1.address, value1)
        await expect(token.connect(addr1).transferFrom(admin.address, addr1.address, value3))
            .to.be.revertedWith('Not enough tokens or amount is more than allowed')
    })

    it('throws and error if permission to withdraw tokens is not received', async () => {
        await token.connect(admin).transfer(addr2.address, value)
        await expect(token.connect(admin).approve(addr1.address, value1))
            .to.be.revertedWith('Not enough tokens for approve')

    })
})





