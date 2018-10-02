import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import Modal from '../../HOC/Modal';
import StripeCheckoutForm from '../../StripeCheckoutForm';
import OrderTotal from '../OrderTotal';
import OrderList from '../OrderList';
import CheckBox from '../CheckBox';
import PartyTablesTitle from '../PartyTablesTitle';
import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

export default function CheckoutModalMain(props) {
  const {
    modalIsOpen,
    tables,
    location,
    setTotal,
    sendPayment,
    partyId,
    order,
    splitOrder,
    openSplitModal,
    toggleSplitCheckItem,
    toggleCheckout,
    showStripe,
    server
  } = props;

  return (
    <Modal isOpen={modalIsOpen}>
      <s.Title>
        <PartyTablesTitle tables={tables} />
        <div>{server}</div>
      </s.Title>
      <OrderList
        splitOrder={splitOrder}
        order={order}
        ItemButton={CheckBox}
        itemAction={toggleSplitCheckItem}
      />
      <s.Checkout>
        <OrderTotal order={order} location={location} setTotal={setTotal} />
      </s.Checkout>
      <s.OrderButtons>
        {showStripe ? (
          <Elements>
            <StripeCheckoutForm
              sendPayment={sendPayment}
              total={order.reduce((acc, item) => acc + item.price, 0)}
              isSplit={false}
              partyId={partyId}
            />
          </Elements>
        ) : (
          <React.Fragment>
            <Button
              inactive={!splitOrder.length}
              dark
              type="button"
              onClick={splitOrder.length ? openSplitModal : undefined}
            >
              Split Check
            </Button>
            <Button dark primary type="button" onClick={toggleCheckout}>
              Checkout
            </Button>
          </React.Fragment>
        )}
      </s.OrderButtons>
    </Modal>
  );
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

CheckoutModalMain.propTypes = {
  openSplitModal: PropTypes.func,
  setTotal: PropTypes.func,
  toggleSplitCheckItem: PropTypes.func,
  sendPayment: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  partyId: PropTypes.string,
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  location: locationType,
  toggleCheckout: PropTypes.func,
  showStripe: PropTypes.bool,
  server: PropTypes.string
};

CheckoutModalMain.defaultProps = {
  openSplitModal: () => {},
  setTotal: () => {},
  toggleSplitCheckItem: () => {},
  sendPayment: () => {},
  modalIsOpen: false,
  partyId: 'defaultpartyid',
  order: [],
  splitOrder: [],
  tables: [{ number: 4 }],
  location: { country: 'US', state: 'CA' },
  toggleCheckout: () => {},
  showStripe: false,
  server: 'Server Name'
};