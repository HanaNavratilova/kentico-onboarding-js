import React from 'react';
import assignment from '../assignment.gif';
import PropTypes from 'prop-types';
import * as Immutable from 'immutable';

import { TsComponent } from './TsComponent.tsx';
import { Item } from '../containers/Item.jsx';
import { AddItem } from '../containers/AddItem.jsx';

export const List = (props) => (
  <div className="row">
    {/* TODO: You can delete the assignment part once you do not need it */}
    <div className="row">
      <div className="col-sm-12 text-center">
        <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
      </div>
    </div>

    <div className="row">
      <div className="col-sm-12">
        <p className="lead text-center">
          Desired functionality is captured in the gif image.
        </p>
        <p className="lead text-center">
          <b>
            Note:
          </b>
          Try to make solution easily extensible (e.g. more displayed fields per item like
          <code>
            dateCreated
          </code>
          ).
        </p>
        <img
          src={assignment}
          alt="assignment"
          className="img--assignment"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {
            props.list.valueSeq()
              .toArray()
              .map((item, index) => (
                  <Item
                    key={item.get('id')}
                    index={index}
                    item={item}
                  />
                )
              )
          }
          <AddItem />
        </ul>
      </div>
    </div>
  </div>
);

List.displayName = 'List';

List.propTypes = {
  list: PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
};
