import React from 'react';
import PropTypes from 'prop-types';

import DeleteButton from '../DeleteButton';
import PartyTablesTitle from '../PartyTablesTitle';
import OrderTotal from '../OrderTotal';
import OrderList from '../OrderList';
import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

export default function OrderScratchPad(props) {
  const {
    tables,
    order,
    removeItemFromOrder,
    location,
    subTotal,
    setTotal,
    saveParty,
    openModal
  } = props;

  return (
    <s.Container>
      <PartyTablesTitle tables={tables} />
      <OrderList order={order} ItemButton={DeleteButton} itemAction={removeItemFromOrder} />
      <s.Checkout>
        <OrderTotal location={location} order={order} subTotal={subTotal} setTotal={setTotal} />
        <s.ButtonContainer>
          <Button primary dark type="button" onClick={saveParty}>
            Save
          </Button>
          <Button dark type="button" onClick={order.length ? openModal : undefined} inactive={!order.length}>
            Checkout Now
          </Button>
        </s.ButtonContainer>
      </s.Checkout>
    </s.Container>
  );
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

OrderScratchPad.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  order: PropTypes.arrayOf(PropTypes.object),
  removeItemFromOrder: PropTypes.func,
  location: locationType,
  subTotal: PropTypes.number,
  setTotal: PropTypes.func,
  openModal: PropTypes.func,
  saveParty: PropTypes.func
};

OrderScratchPad.defaultProps = {
  tables: [{}],
  order: [{}],
  subTotal: 0,
  location: { country: 'US', state: 'OR' },
  removeItemFromOrder: () => {},
  setTotal: () => {},
  openModal: () => {},
  saveParty: () => {}
};
