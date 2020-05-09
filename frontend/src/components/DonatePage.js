import React, { useState } from 'react';
import RecipientPicker from './RecipientPicker';
import DonationFlow from './DonateFlow'

function DonatePage() {

    const [recipientEmail, setRecipientEmail] = useState("");
    const [recipientFirstName, setRecipientFirstName] = useState("");
    const [recipientLastName, setRecipientLastName] = useState("");

    return (
        <div>
            { recipientEmail == "" && (
                <RecipientPicker 
                        setRecipientEmail={setRecipientEmail}
                        setRecipientFirstName={setRecipientFirstName}
                        setRecipientLastName={setRecipientLastName}
                        />
            )}
            { recipientEmail != "" && (
                <DonationFlow 
                        setRecipientEmail={setRecipientEmail}
                        recipientEmail={recipientEmail}
                        recipientFirstName={recipientFirstName}
                        recipientLastName={recipientLastName}
                        />
            )}
        </div>
    );
}

export default DonatePage;