import React, { useState } from 'react'

const ModalWallet = () => {
    const [balance, setBalance] = useState(0);
    const [history, setHistory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isDeposit, setIsDeposit] = useState(true);

    const resetForm =() =>{
        document.querySelector('#amount').value='';
    }

    const handleTransaction = () => {
        const amount = parseFloat(document.getElementById('amount').value);
        if (amount <= 0 || (isDeposit === false && amount > balance)) {
            return;
        }
        const newBalance = isDeposit ? balance + amount : balance - amount;
        setBalance(newBalance);
        const newHistory = [...history, {
            type: isDeposit ? 'Deposit' : 'Withdraw',
            alert: isDeposit ? 'success' : 'danger',
            amount,
            time: new Date().toLocaleString()
        }];
        setHistory(newHistory);
        setShowModal(false);
        resetForm();
    }

    return (
        <div className='container text-center bg-black text-white pt-5'>
            <h3 className='fw-bold text-white'>My Wallet</h3>
            <p className='text-warning fw-bolder fs-3 mt-3'>${balance}</p>
            <p className='fw-bold'>Total balance</p>
            <div >
                {/* Modal trigger button */}
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalId" onClick={() => {
                    setShowModal(true); setIsDeposit(true)
                }} >
                    Deposit
                </button>
                <button type="button" className="btn btn-danger ms-3" data-bs-toggle="modal" data-bs-target="#modalId" onClick={() => {
                    setShowModal(false); setIsDeposit(false)
                }}>
                    Withdraw
                </button>
                {/* Modal Body */}
                {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
                <div className="modal fade" id="modalId" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header" show={showModal} onHide={() => setShowModal(false)}>
                                <h5 className="modal-title text-black" id="modalTitleId">
                                    {isDeposit ? 'Deposit' : 'Withdraw'}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body text-black text-start">Amount
                                <input type="text" className='form-control' name='money' placeholder="input money" id='amount' />
                                <p id='spThongBao'></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleTransaction}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Optional: Place to the bottom of scripts */}
            <h3 className='mt-5'>Transaction History</h3>
            {history.map((item, index) => (
                <div key={index} className={`alert alert-${item.alert} w-100 rounded rounded-2 mb-0`}>
                    {/* {item.type} {item.amount} VNĐ - {item.time} */}
                    <table className='w-100'>
                        <tbody>
                            <tr>
                                <td className='text-start w-25 ps-3'>{item.type}</td>
                                <td className='text-center w-25'>${item.amount}</td>
                                <td className='text-end w-25 pe-3'>{item.time}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default ModalWallet