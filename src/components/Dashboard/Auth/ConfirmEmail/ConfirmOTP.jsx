import React, { useState, useRef, useEffect } from 'react';
import CTaxifyLogo from '../../../../assets/images/4.png';

const ConfirmOTP = () => {
          const [otp, setOtp] = useState(['', '', '', '']);
          const [timer, setTimer] = useState(30);
          const [resendDisabled, setResendDisabled] = useState(true);
          const inputRefs = useRef([]);

          useEffect(() => {
                    if (timer > 0) {
                              const interval = setInterval(() => {
                                        setTimer((prev) => prev - 1);
                              }, 1000);
                              return () => clearInterval(interval);
                    } else {
                              setResendDisabled(false);
                    }
          }, [timer]);

          const handleChange = (index, value) => {
                    if (!/^[0-9]?$/.test(value)) return;
                    const newOtp = [...otp];
                    newOtp[index] = value;
                    setOtp(newOtp);

                    if (value && index < 3) {
                              inputRefs.current[index + 1].focus();
                    }
          };

          const handleKeyDown = (index, e) => {
                    if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              inputRefs.current[index - 1].focus();
                    }
          };

          const handleResend = () => {
                    setOtp(['', '', '', '']);
                    setTimer(30);
                    setResendDisabled(true);
                    console.log('OTP has been resent');
          };

          return (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                              <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                                        <img src={CTaxifyLogo} alt="CTaxify Logo" className="w-50 mx-auto mb-4" />
                                        <p className="text-center text-gray-600 mb-6">
                                                  Silahkan masukkan kode OTP yang telah dikirim melalui email anda.
                                        </p>
                                        <form>
                                                  <div className="flex justify-center space-x-4 mb-4">
                                                            {otp.map((digit, index) => (
                                                                      <input
                                                                                key={index}
                                                                                ref={(el) => (inputRefs.current[index] = el)}
                                                                                type="text"
                                                                                maxLength="1"
                                                                                className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                                                value={digit}
                                                                                onChange={(e) => handleChange(index, e.target.value)}
                                                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                                      />
                                                            ))}
                                                  </div>
                                                  <button
                                                            type="submit"
                                                            className="bg-purple-900 hover:bg-purple-950 text-white py-2 px-4 rounded w-full mb-4"
                                                  >
                                                            Confirm OTP
                                                  </button>
                                                  <p className="text-center text-gray-600">
                                                            Tidak Menerima Kode OTP?{' '}
                                                            <button
                                                                      onClick={handleResend}
                                                                      disabled={resendDisabled}
                                                                      className={`text-blue-500 ${resendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                                                            >
                                                                      Kirim ulang kode {resendDisabled && `(${timer}s)`}
                                                            </button>
                                                  </p>
                                        </form>
                              </div>
                    </div>
          );
};

export default ConfirmOTP;
