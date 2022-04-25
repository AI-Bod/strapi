import React, { useReducer, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import LogoInput from '../LogoInput';
import { useConfigurations } from '../../../../../../hooks';
import reducer, { initialState } from './reducer';
import init from './init';

const Form = forwardRef(({ projectSettingsStored }, ref) => {
  const { formatMessage } = useIntl();
  const {
    logos: { menu },
  } = useConfigurations();
  const [{ menuLogo }, dispatch] = useReducer(reducer, initialState, () =>
    init(initialState, projectSettingsStored)
  );

  const handleChangeMenuLogo = asset => {
    dispatch({
      type: 'SET_CUSTOM_MENU_LOGO',
      value: asset,
    });
  };

  const handleResetMenuLogo = () => {
    dispatch({
      type: 'RESET_CUSTOM_MENU_LOGO',
    });
  };

  useImperativeHandle(ref, () => ({
    getValues: () => ({ menuLogo: menuLogo.submit }),
  }));

  return (
    <Box
      hasRadius
      background="neutral0"
      shadow="tableShadow"
      paddingTop={7}
      paddingBottom={7}
      paddingRight={6}
      paddingLeft={6}
    >
      <Typography variant="delta" as="h3">
        {formatMessage({
          id: 'Settings.application.customization',
          defaultMessage: 'Customization',
        })}
      </Typography>
      <Grid paddingTop={5}>
        <GridItem col={6} s={12}>
          <LogoInput
            onChangeLogo={handleChangeMenuLogo}
            customLogo={menuLogo.display}
            defaultLogo={menu.default}
            onResetMenuLogo={handleResetMenuLogo}
          />
        </GridItem>
      </Grid>
    </Box>
  );
});

Form.defaultProps = {
  projectSettingsStored: null,
};

Form.propTypes = {
  projectSettingsStored: PropTypes.shape({
    menuLogo: PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

export default Form;
