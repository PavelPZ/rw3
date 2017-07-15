import React from 'react';

export const isStateles = (Component) => !Component.prototype || !Component.prototype.render; //Component je React.stateles


