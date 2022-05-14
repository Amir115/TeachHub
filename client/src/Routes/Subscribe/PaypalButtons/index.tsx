import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ButtonWrapper from './ButtonWrapper';

const currency = "USD";

interface PaypalButtonsProps {
    amount: string,
    handleSubscribe: () => void
}

const clientId = "AYqtjoOaCTbpPwGLI_5i9o-uagQaBm5znoCydkBsLUINBEly-88qzKxKJo53fjWrLs0093nFJ6_wM4J8";

const PayPalButtons = ({ amount, handleSubscribe }: PaypalButtonsProps) => (
    <PayPalScriptProvider options={{ "client-id": clientId, components: "buttons", currency }}> 
        <ButtonWrapper amount={amount} currency={currency} showSpinner={false} handleSubscribe={handleSubscribe} />
    </PayPalScriptProvider>
);

export default PayPalButtons;