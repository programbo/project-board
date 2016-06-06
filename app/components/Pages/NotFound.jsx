import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="not-found">
    <h1 className="heading">Oops!</h1>
    <p>Well this is awkward... the page you're looking for can't be found, or the interwebs has actually broken! In any case, <Link to="/">head back to our homepage</Link> my friend!</p>
  </div>
);

export default NotFound;
