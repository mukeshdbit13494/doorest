import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PartnerProfileForm from '../../components/partner/partnerProfileForm';
import PartnerServiceForm from '../../components/partner/partnerServiceForm';
import { useRouter } from 'next/router';
import { PartnerProtectedPage, useAuth } from '../../auth/useAuth';
import Welcome from '../../components/welcome';
import Welcome1 from '../../components/welcome1';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	welcomePage: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: 50
	}
}));

function getSteps() {
	return [ 'Insert Personal Details', 'Insert Service Details', 'Completed' ];
}

export default function Forms(props) {
	const router = useRouter();
	const classes = useStyles();
	const [ activeStep, setActiveStep ] = React.useState(0);
	const steps = getSteps();
	const { partner } = useAuth();
	const { action } = router.query;

	const handleNext = (index) => {
		setActiveStep(index);
	};

	const getStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				if (partner.partnerDetails == null || action.trim() === 'edit') {
					return <PartnerProfileForm next={handleNext} action={action} />;
				} else {
					return handleNext(1);
				}
			case 1:
				if (partner.partnerServices == null || action.trim() === 'edit') {
					return <PartnerServiceForm next={handleNext} action={action} />;
				} else {
					return handleNext(2);
				}
			default:
				return (
					<div style={{ textAlign: 'center' }}>
						<Typography variant="h5" color="primary">
							Welcome To Doorest
						</Typography>
						<div className={classes.welcomePage}>
							<Welcome1 />
						</div>
						<Button variant="contained" color="primary" onClick={() => router.replace('/partner')}>
							Go To Dashboard
						</Button>
					</div>
				);
		}
	};

	return (
		<PartnerProtectedPage>
			<div className={classes.root}>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				<div>{partner && getStepContent(activeStep)}</div>
			</div>
		</PartnerProtectedPage>
	);
}
