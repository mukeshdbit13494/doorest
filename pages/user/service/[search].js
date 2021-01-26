import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAuth, UserProtectedPage } from "../../../auth/useAuth";
import DashboardLayout from "../../../layouts/dashboardLayout";
import { menuOption, routes } from "../../../router/userRoutes";
import ServicePageSection from "../../../components/servicePageSection";
import { getPartnerlistByCity } from "../../../store/actions/serviceAction";
import Head from "next/head";

function Services(props) {
  const router = useRouter();
  const { user } = useAuth();

  const { city, serviceId } = router.query;
  useEffect(() => {
    if (city != null && serviceId != null) {
      props.dispatch(getPartnerlistByCity(serviceId, city));
    }
  });

  return (
    <UserProtectedPage>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Service | Doorest</title>
      </Head>
      <div style={{ marginTop: 20 }}>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={user && user}
        >
          <Container>
            <ServicePageSection data={props.data && props.data.data} />
          </Container>
        </DashboardLayout>
      </div>
    </UserProtectedPage>
  );
}

const mapStateToProps = (state) => {
  return { data: state.serviceReducer.partnerListByCity };
};

export default connect(mapStateToProps)(Services);
