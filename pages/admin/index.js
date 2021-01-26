import { Container, Grid } from '@material-ui/core';
import Axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PartnerDataTable from '../../components/admin/partnerDataTable';
import ProfileCard from '../../components/profileCard';
import DashboardLayout from '../../layouts/dashboardLayout';
import { menuOption, routes } from '../../router/adminRoutes';
import { getPartnerDetails } from '../../store/actions/adminAction';
function index(props) {
	useEffect(async () => {
		props.dispatch(getPartnerDetails());
	}, []);

	const handlePartnerApproval = async (partnerId) => {
		try {
			const res = await Axios.patch('/api/partner/approval', {
				partnerId: partnerId
			});
			if (res != null) {
				alert(res.data.message);
			} else {
				alert(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<DashboardLayout route={routes} menuOption={menuOption} profile={{}}>
			<div>
				<Container>
					{props.partnerData && (
						<div>
							<br />
							<Grid container spacing={1}>
								{props.partnerData.data.map((item, index) => (
									<Grid item sm={3} xs={12} key={index}>
										<ProfileCard
											user={{
												firstName: item.firstName,
												lastName: item.lastName,
												email: item.email,
												image: item.partnerDetails.image,
												service: item.service.serviceName,
												partnerId: item._id
											}}
											data={item}
											onApprove={handlePartnerApproval}
										/>
									</Grid>
								))}
							</Grid>
							<br />
							<PartnerDataTable data={props.partnerData.data} onApprove={handlePartnerApproval} />
						</div>
					)}
				</Container>
			</div>
		</DashboardLayout>
	);
}

const mapStateToProps = (state) => {
	return { partnerData: state.adminReducer.partnerDetailsRes };
};

export default connect(mapStateToProps)(index);
