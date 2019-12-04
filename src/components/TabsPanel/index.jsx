import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabsPanel = ({ tabStatus, setTabStatus }) => {
  const handleChange = (event, newValue) => {
    setTabStatus(newValue);
  };

  return (
    <Tabs
      value={tabStatus}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
      variant="fullWidth"
    >
      <Tab label="Simple Interest" />
      <Tab label="Compound Interest" />
    </Tabs>
  );
};

export default TabsPanel;
