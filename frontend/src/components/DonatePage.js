import React, { useState } from 'react';
import RecipientPicker from './RecipientPicker';
import DonationFlow from './DonateFlow'
import DonorLanding from './DonorLanding'
import { PrimaryButton, SecondaryButton, TertiartyButton } from '../shared/ButtonComponents.js';

function DonatePage() {

    const [recipientEmail, setRecipientEmail] = useState("");
    const [recipientFirstName, setRecipientFirstName] = useState("");
    const [recipientLastName, setRecipientLastName] = useState("");
    const [finishedLanding, setFinishedLanding] = useState(false);


    return (
        <div>
            {!finishedLanding ? (
                <>
                    <DonorLanding letsGo={<PrimaryButton text="Let's get donating!" onClick={() => setFinishedLanding(true)}></PrimaryButton>}></DonorLanding>

                </>
            ) : (
                <>
                    {recipientEmail == "" && (
                        <RecipientPicker
                            setRecipientEmail={setRecipientEmail}
                            setRecipientFirstName={setRecipientFirstName}
                            setRecipientLastName={setRecipientLastName}
                        />
                    )}
                    {recipientEmail != "" && (
                        <DonationFlow
                            setRecipientEmail={setRecipientEmail}
                            recipientEmail={recipientEmail}
                            recipientFirstName={recipientFirstName}
                            recipientLastName={recipientLastName}
                        />
                    )}
                </>
            )}

        </div>
    );
}

export default DonatePage;