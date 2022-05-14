import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface ButtonWrapperProps {
    amount: string,
    currency: string,
    showSpinner: boolean,
    handleSubscribe: () => void
}

const ButtonWrapper = ({ amount, currency, showSpinner, handleSubscribe }: ButtonWrapperProps) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency
            },
        });
    }, [currency, showSpinner]);


    return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
            disabled={false}
            forceReRender={[amount, currency]}
            fundingSource={undefined}
            createOrder={(data, actions) => actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: currency,
                                value: amount,
                            },
                        },
                    ],
                })
                .then(orderId => orderId)
            }
            onApprove={(data, actions) => actions.order.capture().then(() => {
                handleSubscribe();
            })}
        />
    </>
    );
}

export default ButtonWrapper;