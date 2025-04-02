// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package contracts

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// AccessManagerFileAccess is an auto generated low-level Go binding around an user-defined struct.
type AccessManagerFileAccess struct {
	Policy   common.Address
	IsPublic bool
}

// AccessManagerMetaData contains all meta data concerning the AccessManager contract.
var AccessManagerMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"storageAddress\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fileId\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"policyContract\",\"type\":\"address\"}],\"name\":\"PolicyChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fileId\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"isPublic\",\"type\":\"bool\"}],\"name\":\"PublicAccessChanged\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"fileId\",\"type\":\"bytes32\"},{\"internalType\":\"bool\",\"name\":\"isPublic\",\"type\":\"bool\"}],\"name\":\"changePublicAccess\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"fileId\",\"type\":\"bytes32\"}],\"name\":\"getFileAccessInfo\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"policy\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"isPublic\",\"type\":\"bool\"}],\"internalType\":\"structAccessManager.FileAccess\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"fileId\",\"type\":\"bytes32\"}],\"name\":\"getPolicy\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"fileId\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"policyContract\",\"type\":\"address\"}],\"name\":\"setPolicy\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"storageContract\",\"outputs\":[{\"internalType\":\"contractIStorage\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b50604051610d1b380380610d1b833981016040819052602b91604e565b5f80546001600160a01b0319166001600160a01b03929092169190911790556079565b5f60208284031215605d575f5ffd5b81516001600160a01b03811681146072575f5ffd5b9392505050565b610c95806100865f395ff3fe608060405234801561000f575f5ffd5b5060043610610055575f3560e01c806311ce02671461005957806338f5f5b2146100885780633a82c9121461009d5780638791bf821461011e578063a3f685f914610131575b5f5ffd5b5f5461006b906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61009b61009636600461067a565b610159565b005b6100f86100ab3660046106ac565b604080518082019091525f8082526020820152505f908152600160209081526040918290208251808401909352546001600160a01b0381168352600160a01b900460ff1615159082015290565b6040805182516001600160a01b031681526020928301511515928101929092520161007f565b61009b61012c3660046106da565b6103f3565b61006b61013f3660046106ac565b5f908152600160205260409020546001600160a01b031690565b5f8054604051637d7602a160e11b8152600481018590528492916001600160a01b03169063faec0542906024015f60405180830381865afa1580156101a0573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526101c7919081019061098e565b60408101519091505f036102185760405162461bcd60e51b8152602060048201526013602482015272119a5b1948191bd95cc81b9bdd08195e1a5cdd606a1b60448201526064015b60405180910390fd5b6040805160018082528183019092525f91602080830190803683370190505090508160400151815f8151811061025057610250610a74565b60209081029190910101525f80546040516335bdb71160e01b81526001600160a01b03909116906335bdb7119061028b908590600401610a88565b5f60405180830381865afa1580156102a5573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526102cc9190810190610aca565b90505f8151116103115760405162461bcd60e51b815260206004820152601060248201526f109d58dad95d081b9bdd08199bdd5b9960821b604482015260640161020f565b5f815f8151811061032457610324610a74565b60200260200101519050336001600160a01b031681606001516001600160a01b0316146103885760405162461bcd60e51b81526020600482015260126024820152712737ba103a3432903334b6329037bbb732b960711b604482015260640161020f565b5f87815260016020526040908190208054881515600160a01b0260ff60a01b199091161790555187907f9500a58cfb37cef230929cd9f25ce92c41374416f23b1825232d0905a7e73d5a906103e290891515815260200190565b60405180910390a250505050505050565b5f8054604051637d7602a160e11b8152600481018590528492916001600160a01b03169063faec0542906024015f60405180830381865afa15801561043a573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052610461919081019061098e565b60408101519091505f036104ad5760405162461bcd60e51b8152602060048201526013602482015272119a5b1948191bd95cc81b9bdd08195e1a5cdd606a1b604482015260640161020f565b6040805160018082528183019092525f91602080830190803683370190505090508160400151815f815181106104e5576104e5610a74565b60209081029190910101525f80546040516335bdb71160e01b81526001600160a01b03909116906335bdb71190610520908590600401610a88565b5f60405180830381865afa15801561053a573d5f5f3e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526105619190810190610aca565b90505f8151116105a65760405162461bcd60e51b815260206004820152601060248201526f109d58dad95d081b9bdd08199bdd5b9960821b604482015260640161020f565b5f815f815181106105b9576105b9610a74565b60200260200101519050336001600160a01b031681606001516001600160a01b03161461061d5760405162461bcd60e51b81526020600482015260126024820152712737ba103a3432903334b6329037bbb732b960711b604482015260640161020f565b5f8781526001602052604080822080546001600160a01b0319166001600160a01b038a169081179091559051909189917fee78f4c2af2887839fdcba441de8e4d2d1b117b89ce7cc7a7f0a952871cc87d29190a350505050505050565b5f5f6040838503121561068b575f5ffd5b82359150602083013580151581146106a1575f5ffd5b809150509250929050565b5f602082840312156106bc575f5ffd5b5035919050565b6001600160a01b03811681146106d7575f5ffd5b50565b5f5f604083850312156106eb575f5ffd5b8235915060208301356106a1816106c3565b634e487b7160e01b5f52604160045260245ffd5b604080519081016001600160401b0381118282101715610733576107336106fd565b60405290565b60405160e081016001600160401b0381118282101715610733576107336106fd565b60405160a081016001600160401b0381118282101715610733576107336106fd565b604051601f8201601f191681016001600160401b03811182821017156107a5576107a56106fd565b604052919050565b5f82601f8301126107bc575f5ffd5b8151602083015f5f6001600160401b038411156107db576107db6106fd565b50601f8301601f19166020016107f08161077d565b915050828152858383011115610804575f5ffd5b8282602083015e5f92810160200192909252509392505050565b5f6001600160401b03821115610836576108366106fd565b5060051b60200190565b5f82601f83011261084f575f5ffd5b815161086261085d8261081e565b61077d565b8082825260208201915060208360051b860101925085831115610883575f5ffd5b602085015b838110156108a0578051835260209283019201610888565b5095945050505050565b5f604082840312156108ba575f5ffd5b6108c2610711565b905081516001600160401b038111156108d9575f5ffd5b8201601f810184136108e9575f5ffd5b80516108f761085d8261081e565b8082825260208201915060208360051b850101925086831115610918575f5ffd5b602084015b838110156109585780516001600160401b0381111561093a575f5ffd5b610949896020838901016107ad565b8452506020928301920161091d565b50845250505060208201516001600160401b03811115610976575f5ffd5b61098284828501610840565b60208301525092915050565b5f6020828403121561099e575f5ffd5b81516001600160401b038111156109b3575f5ffd5b820160e081850312156109c4575f5ffd5b6109cc610739565b8151815260208201516001600160401b038111156109e8575f5ffd5b6109f4868285016107ad565b6020830152506040828101519082015260608201516001600160401b03811115610a1c575f5ffd5b610a28868285016107ad565b6060830152506080828101519082015260a0808301519082015260c08201516001600160401b03811115610a5a575f5ffd5b610a66868285016108aa565b60c083015250949350505050565b634e487b7160e01b5f52603260045260245ffd5b602080825282518282018190525f918401906040840190835b81811015610abf578351835260209384019390920191600101610aa1565b509095945050505050565b5f60208284031215610ada575f5ffd5b81516001600160401b03811115610aef575f5ffd5b8201601f81018413610aff575f5ffd5b8051610b0d61085d8261081e565b8082825260208201915060208360051b850101925086831115610b2e575f5ffd5b602084015b83811015610c545780516001600160401b03811115610b50575f5ffd5b850160a0818a03601f19011215610b65575f5ffd5b610b6d61075b565b6020820151815260408201516001600160401b03811115610b8c575f5ffd5b610b9b8b6020838601016107ad565b602083015250606082015160408201526080820151610bb9816106c3565b606082015260a08201516001600160401b03811115610bd6575f5ffd5b60208184010192505089601f830112610bed575f5ffd5b8151610bfb61085d8261081e565b8082825260208201915060208360051b86010192508c831115610c1c575f5ffd5b6020850194505b82851015610c3e578451825260209485019490910190610c23565b6080840152505084525060209283019201610b33565b50969550505050505056fea2646970667358221220ca881d621159762f93321b4c7a19dab56b45a7277ba440b109407db9bb92794664736f6c634300081c0033",
}

// AccessManagerABI is the input ABI used to generate the binding from.
// Deprecated: Use AccessManagerMetaData.ABI instead.
var AccessManagerABI = AccessManagerMetaData.ABI

// AccessManagerBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use AccessManagerMetaData.Bin instead.
var AccessManagerBin = AccessManagerMetaData.Bin

// DeployAccessManager deploys a new Ethereum contract, binding an instance of AccessManager to it.
func DeployAccessManager(auth *bind.TransactOpts, backend bind.ContractBackend, storageAddress common.Address) (common.Address, *types.Transaction, *AccessManager, error) {
	parsed, err := AccessManagerMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(AccessManagerBin), backend, storageAddress)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &AccessManager{AccessManagerCaller: AccessManagerCaller{contract: contract}, AccessManagerTransactor: AccessManagerTransactor{contract: contract}, AccessManagerFilterer: AccessManagerFilterer{contract: contract}}, nil
}

// AccessManager is an auto generated Go binding around an Ethereum contract.
type AccessManager struct {
	AccessManagerCaller     // Read-only binding to the contract
	AccessManagerTransactor // Write-only binding to the contract
	AccessManagerFilterer   // Log filterer for contract events
}

// AccessManagerCaller is an auto generated read-only Go binding around an Ethereum contract.
type AccessManagerCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AccessManagerTransactor is an auto generated write-only Go binding around an Ethereum contract.
type AccessManagerTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AccessManagerFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type AccessManagerFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AccessManagerSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type AccessManagerSession struct {
	Contract     *AccessManager    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// AccessManagerCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type AccessManagerCallerSession struct {
	Contract *AccessManagerCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// AccessManagerTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type AccessManagerTransactorSession struct {
	Contract     *AccessManagerTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// AccessManagerRaw is an auto generated low-level Go binding around an Ethereum contract.
type AccessManagerRaw struct {
	Contract *AccessManager // Generic contract binding to access the raw methods on
}

// AccessManagerCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type AccessManagerCallerRaw struct {
	Contract *AccessManagerCaller // Generic read-only contract binding to access the raw methods on
}

// AccessManagerTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type AccessManagerTransactorRaw struct {
	Contract *AccessManagerTransactor // Generic write-only contract binding to access the raw methods on
}

// NewAccessManager creates a new instance of AccessManager, bound to a specific deployed contract.
func NewAccessManager(address common.Address, backend bind.ContractBackend) (*AccessManager, error) {
	contract, err := bindAccessManager(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &AccessManager{AccessManagerCaller: AccessManagerCaller{contract: contract}, AccessManagerTransactor: AccessManagerTransactor{contract: contract}, AccessManagerFilterer: AccessManagerFilterer{contract: contract}}, nil
}

// NewAccessManagerCaller creates a new read-only instance of AccessManager, bound to a specific deployed contract.
func NewAccessManagerCaller(address common.Address, caller bind.ContractCaller) (*AccessManagerCaller, error) {
	contract, err := bindAccessManager(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &AccessManagerCaller{contract: contract}, nil
}

// NewAccessManagerTransactor creates a new write-only instance of AccessManager, bound to a specific deployed contract.
func NewAccessManagerTransactor(address common.Address, transactor bind.ContractTransactor) (*AccessManagerTransactor, error) {
	contract, err := bindAccessManager(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &AccessManagerTransactor{contract: contract}, nil
}

// NewAccessManagerFilterer creates a new log filterer instance of AccessManager, bound to a specific deployed contract.
func NewAccessManagerFilterer(address common.Address, filterer bind.ContractFilterer) (*AccessManagerFilterer, error) {
	contract, err := bindAccessManager(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &AccessManagerFilterer{contract: contract}, nil
}

// bindAccessManager binds a generic wrapper to an already deployed contract.
func bindAccessManager(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := AccessManagerMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_AccessManager *AccessManagerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _AccessManager.Contract.AccessManagerCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_AccessManager *AccessManagerRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _AccessManager.Contract.AccessManagerTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_AccessManager *AccessManagerRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _AccessManager.Contract.AccessManagerTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_AccessManager *AccessManagerCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _AccessManager.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_AccessManager *AccessManagerTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _AccessManager.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_AccessManager *AccessManagerTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _AccessManager.Contract.contract.Transact(opts, method, params...)
}

// GetFileAccessInfo is a free data retrieval call binding the contract method 0x3a82c912.
//
// Solidity: function getFileAccessInfo(bytes32 fileId) view returns((address,bool))
func (_AccessManager *AccessManagerCaller) GetFileAccessInfo(opts *bind.CallOpts, fileId [32]byte) (AccessManagerFileAccess, error) {
	var out []interface{}
	err := _AccessManager.contract.Call(opts, &out, "getFileAccessInfo", fileId)

	if err != nil {
		return *new(AccessManagerFileAccess), err
	}

	out0 := *abi.ConvertType(out[0], new(AccessManagerFileAccess)).(*AccessManagerFileAccess)

	return out0, err

}

// GetFileAccessInfo is a free data retrieval call binding the contract method 0x3a82c912.
//
// Solidity: function getFileAccessInfo(bytes32 fileId) view returns((address,bool))
func (_AccessManager *AccessManagerSession) GetFileAccessInfo(fileId [32]byte) (AccessManagerFileAccess, error) {
	return _AccessManager.Contract.GetFileAccessInfo(&_AccessManager.CallOpts, fileId)
}

// GetFileAccessInfo is a free data retrieval call binding the contract method 0x3a82c912.
//
// Solidity: function getFileAccessInfo(bytes32 fileId) view returns((address,bool))
func (_AccessManager *AccessManagerCallerSession) GetFileAccessInfo(fileId [32]byte) (AccessManagerFileAccess, error) {
	return _AccessManager.Contract.GetFileAccessInfo(&_AccessManager.CallOpts, fileId)
}

// GetPolicy is a free data retrieval call binding the contract method 0xa3f685f9.
//
// Solidity: function getPolicy(bytes32 fileId) view returns(address)
func (_AccessManager *AccessManagerCaller) GetPolicy(opts *bind.CallOpts, fileId [32]byte) (common.Address, error) {
	var out []interface{}
	err := _AccessManager.contract.Call(opts, &out, "getPolicy", fileId)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetPolicy is a free data retrieval call binding the contract method 0xa3f685f9.
//
// Solidity: function getPolicy(bytes32 fileId) view returns(address)
func (_AccessManager *AccessManagerSession) GetPolicy(fileId [32]byte) (common.Address, error) {
	return _AccessManager.Contract.GetPolicy(&_AccessManager.CallOpts, fileId)
}

// GetPolicy is a free data retrieval call binding the contract method 0xa3f685f9.
//
// Solidity: function getPolicy(bytes32 fileId) view returns(address)
func (_AccessManager *AccessManagerCallerSession) GetPolicy(fileId [32]byte) (common.Address, error) {
	return _AccessManager.Contract.GetPolicy(&_AccessManager.CallOpts, fileId)
}

// StorageContract is a free data retrieval call binding the contract method 0x11ce0267.
//
// Solidity: function storageContract() view returns(address)
func (_AccessManager *AccessManagerCaller) StorageContract(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _AccessManager.contract.Call(opts, &out, "storageContract")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// StorageContract is a free data retrieval call binding the contract method 0x11ce0267.
//
// Solidity: function storageContract() view returns(address)
func (_AccessManager *AccessManagerSession) StorageContract() (common.Address, error) {
	return _AccessManager.Contract.StorageContract(&_AccessManager.CallOpts)
}

// StorageContract is a free data retrieval call binding the contract method 0x11ce0267.
//
// Solidity: function storageContract() view returns(address)
func (_AccessManager *AccessManagerCallerSession) StorageContract() (common.Address, error) {
	return _AccessManager.Contract.StorageContract(&_AccessManager.CallOpts)
}

// ChangePublicAccess is a paid mutator transaction binding the contract method 0x38f5f5b2.
//
// Solidity: function changePublicAccess(bytes32 fileId, bool isPublic) returns()
func (_AccessManager *AccessManagerTransactor) ChangePublicAccess(opts *bind.TransactOpts, fileId [32]byte, isPublic bool) (*types.Transaction, error) {
	return _AccessManager.contract.Transact(opts, "changePublicAccess", fileId, isPublic)
}

// ChangePublicAccess is a paid mutator transaction binding the contract method 0x38f5f5b2.
//
// Solidity: function changePublicAccess(bytes32 fileId, bool isPublic) returns()
func (_AccessManager *AccessManagerSession) ChangePublicAccess(fileId [32]byte, isPublic bool) (*types.Transaction, error) {
	return _AccessManager.Contract.ChangePublicAccess(&_AccessManager.TransactOpts, fileId, isPublic)
}

// ChangePublicAccess is a paid mutator transaction binding the contract method 0x38f5f5b2.
//
// Solidity: function changePublicAccess(bytes32 fileId, bool isPublic) returns()
func (_AccessManager *AccessManagerTransactorSession) ChangePublicAccess(fileId [32]byte, isPublic bool) (*types.Transaction, error) {
	return _AccessManager.Contract.ChangePublicAccess(&_AccessManager.TransactOpts, fileId, isPublic)
}

// SetPolicy is a paid mutator transaction binding the contract method 0x8791bf82.
//
// Solidity: function setPolicy(bytes32 fileId, address policyContract) returns()
func (_AccessManager *AccessManagerTransactor) SetPolicy(opts *bind.TransactOpts, fileId [32]byte, policyContract common.Address) (*types.Transaction, error) {
	return _AccessManager.contract.Transact(opts, "setPolicy", fileId, policyContract)
}

// SetPolicy is a paid mutator transaction binding the contract method 0x8791bf82.
//
// Solidity: function setPolicy(bytes32 fileId, address policyContract) returns()
func (_AccessManager *AccessManagerSession) SetPolicy(fileId [32]byte, policyContract common.Address) (*types.Transaction, error) {
	return _AccessManager.Contract.SetPolicy(&_AccessManager.TransactOpts, fileId, policyContract)
}

// SetPolicy is a paid mutator transaction binding the contract method 0x8791bf82.
//
// Solidity: function setPolicy(bytes32 fileId, address policyContract) returns()
func (_AccessManager *AccessManagerTransactorSession) SetPolicy(fileId [32]byte, policyContract common.Address) (*types.Transaction, error) {
	return _AccessManager.Contract.SetPolicy(&_AccessManager.TransactOpts, fileId, policyContract)
}

// AccessManagerPolicyChangedIterator is returned from FilterPolicyChanged and is used to iterate over the raw logs and unpacked data for PolicyChanged events raised by the AccessManager contract.
type AccessManagerPolicyChangedIterator struct {
	Event *AccessManagerPolicyChanged // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *AccessManagerPolicyChangedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(AccessManagerPolicyChanged)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(AccessManagerPolicyChanged)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *AccessManagerPolicyChangedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *AccessManagerPolicyChangedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// AccessManagerPolicyChanged represents a PolicyChanged event raised by the AccessManager contract.
type AccessManagerPolicyChanged struct {
	FileId         [32]byte
	PolicyContract common.Address
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterPolicyChanged is a free log retrieval operation binding the contract event 0xee78f4c2af2887839fdcba441de8e4d2d1b117b89ce7cc7a7f0a952871cc87d2.
//
// Solidity: event PolicyChanged(bytes32 indexed fileId, address indexed policyContract)
func (_AccessManager *AccessManagerFilterer) FilterPolicyChanged(opts *bind.FilterOpts, fileId [][32]byte, policyContract []common.Address) (*AccessManagerPolicyChangedIterator, error) {

	var fileIdRule []interface{}
	for _, fileIdItem := range fileId {
		fileIdRule = append(fileIdRule, fileIdItem)
	}
	var policyContractRule []interface{}
	for _, policyContractItem := range policyContract {
		policyContractRule = append(policyContractRule, policyContractItem)
	}

	logs, sub, err := _AccessManager.contract.FilterLogs(opts, "PolicyChanged", fileIdRule, policyContractRule)
	if err != nil {
		return nil, err
	}
	return &AccessManagerPolicyChangedIterator{contract: _AccessManager.contract, event: "PolicyChanged", logs: logs, sub: sub}, nil
}

// WatchPolicyChanged is a free log subscription operation binding the contract event 0xee78f4c2af2887839fdcba441de8e4d2d1b117b89ce7cc7a7f0a952871cc87d2.
//
// Solidity: event PolicyChanged(bytes32 indexed fileId, address indexed policyContract)
func (_AccessManager *AccessManagerFilterer) WatchPolicyChanged(opts *bind.WatchOpts, sink chan<- *AccessManagerPolicyChanged, fileId [][32]byte, policyContract []common.Address) (event.Subscription, error) {

	var fileIdRule []interface{}
	for _, fileIdItem := range fileId {
		fileIdRule = append(fileIdRule, fileIdItem)
	}
	var policyContractRule []interface{}
	for _, policyContractItem := range policyContract {
		policyContractRule = append(policyContractRule, policyContractItem)
	}

	logs, sub, err := _AccessManager.contract.WatchLogs(opts, "PolicyChanged", fileIdRule, policyContractRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(AccessManagerPolicyChanged)
				if err := _AccessManager.contract.UnpackLog(event, "PolicyChanged", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParsePolicyChanged is a log parse operation binding the contract event 0xee78f4c2af2887839fdcba441de8e4d2d1b117b89ce7cc7a7f0a952871cc87d2.
//
// Solidity: event PolicyChanged(bytes32 indexed fileId, address indexed policyContract)
func (_AccessManager *AccessManagerFilterer) ParsePolicyChanged(log types.Log) (*AccessManagerPolicyChanged, error) {
	event := new(AccessManagerPolicyChanged)
	if err := _AccessManager.contract.UnpackLog(event, "PolicyChanged", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// AccessManagerPublicAccessChangedIterator is returned from FilterPublicAccessChanged and is used to iterate over the raw logs and unpacked data for PublicAccessChanged events raised by the AccessManager contract.
type AccessManagerPublicAccessChangedIterator struct {
	Event *AccessManagerPublicAccessChanged // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *AccessManagerPublicAccessChangedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(AccessManagerPublicAccessChanged)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(AccessManagerPublicAccessChanged)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *AccessManagerPublicAccessChangedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *AccessManagerPublicAccessChangedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// AccessManagerPublicAccessChanged represents a PublicAccessChanged event raised by the AccessManager contract.
type AccessManagerPublicAccessChanged struct {
	FileId   [32]byte
	IsPublic bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterPublicAccessChanged is a free log retrieval operation binding the contract event 0x9500a58cfb37cef230929cd9f25ce92c41374416f23b1825232d0905a7e73d5a.
//
// Solidity: event PublicAccessChanged(bytes32 indexed fileId, bool isPublic)
func (_AccessManager *AccessManagerFilterer) FilterPublicAccessChanged(opts *bind.FilterOpts, fileId [][32]byte) (*AccessManagerPublicAccessChangedIterator, error) {

	var fileIdRule []interface{}
	for _, fileIdItem := range fileId {
		fileIdRule = append(fileIdRule, fileIdItem)
	}

	logs, sub, err := _AccessManager.contract.FilterLogs(opts, "PublicAccessChanged", fileIdRule)
	if err != nil {
		return nil, err
	}
	return &AccessManagerPublicAccessChangedIterator{contract: _AccessManager.contract, event: "PublicAccessChanged", logs: logs, sub: sub}, nil
}

// WatchPublicAccessChanged is a free log subscription operation binding the contract event 0x9500a58cfb37cef230929cd9f25ce92c41374416f23b1825232d0905a7e73d5a.
//
// Solidity: event PublicAccessChanged(bytes32 indexed fileId, bool isPublic)
func (_AccessManager *AccessManagerFilterer) WatchPublicAccessChanged(opts *bind.WatchOpts, sink chan<- *AccessManagerPublicAccessChanged, fileId [][32]byte) (event.Subscription, error) {

	var fileIdRule []interface{}
	for _, fileIdItem := range fileId {
		fileIdRule = append(fileIdRule, fileIdItem)
	}

	logs, sub, err := _AccessManager.contract.WatchLogs(opts, "PublicAccessChanged", fileIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(AccessManagerPublicAccessChanged)
				if err := _AccessManager.contract.UnpackLog(event, "PublicAccessChanged", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParsePublicAccessChanged is a log parse operation binding the contract event 0x9500a58cfb37cef230929cd9f25ce92c41374416f23b1825232d0905a7e73d5a.
//
// Solidity: event PublicAccessChanged(bytes32 indexed fileId, bool isPublic)
func (_AccessManager *AccessManagerFilterer) ParsePublicAccessChanged(log types.Log) (*AccessManagerPublicAccessChanged, error) {
	event := new(AccessManagerPublicAccessChanged)
	if err := _AccessManager.contract.UnpackLog(event, "PublicAccessChanged", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
