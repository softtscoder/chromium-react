/* @flow */
import {
  type HOC,
  compose,
  getContext,
  pure,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as React from 'react';
import type { LockedWallet } from '@neo-one/client-core';

import classNames from 'classnames';
// $FlowFixMe
import { webLogger } from '@neotracker/logger';
// $FlowFixMe
import { sanitizeError } from '@neotracker/shared-utils';
import { withRouter } from 'react-router-dom';

import type { AppContext } from '../../../AppContext';
import {
  Button,
  CircularProgress,
  Typography,
  withStyles,
} from '../../../lib/base';
import { PasswordField } from '../common';
import { type Theme } from '../../../styles/createTheme';

import { api as walletAPI } from '../../../wallet';
import * as routes from '../../../routes';

const styles = (theme: Theme) => ({
  [theme.breakpoints.down('sm')]: {
    root: {
      padding: theme.spacing.unit,
    },
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      padding: theme.spacing.unit * 2,
    },
  },
  root: {
    borderBottom: `1px solid ${theme.custom.lightDivider}`,
    display: 'flex',
    flexDirection: 'column',
  },
  passwordArea: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit,
    maxWidth: theme.spacing.unit * 70,
  },
  passwordField: {
    flex: '1 1 auto',
    marginRight: theme.spacing.unit,
  },
  spacer: {
    marginLeft: theme.spacing.unit,
    width: 32,
    height: 32,
  },
  progress: {
    marginLeft: theme.spacing.unit,
  },
  buttonText: {
    color: theme.custom.colors.common.white,
  },
});

type ExternalProps = {|
  wallet: LockedWallet,
  forward?: boolean,
  className?: string,
|};
type InternalProps = {|
  password: string,
  error?: string,
  loading: boolean,
  onChange: (event: Object) => void,
  onSubmit: () => void,
  classes: Object,
|};
type Props = {|
  ...ExternalProps,
  ...InternalProps,
|};
function UnlockWallet({
  className,
  password,
  error,
  loading,
  onChange,
  onSubmit,
  classes,
}: Props): React.Element<*> {
  return (
    <div className={classNames(className, classes.root)}>
      <Typography variant="body1">Unlock your wallet to claim CRON.</Typography>
      <div className={classes.passwordArea}>
        <PasswordField
          id="unlock-wallet-password"
          className={classes.passwordField}
          value={password}
          hasSubtext
          validation={error}
          onChange={onChange}
          onEnter={onSubmit}
          label="Enter Password"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={onSubmit}
        >
          <Typography className={classes.buttonText} variant="body1">
            UNLOCK
          </Typography>
        </Button>
        {loading ? (
          <CircularProgress
            className={classes.progress}
            size={32}
            thickness={5}
          />
        ) : (
          <div className={classes.spacer} />
        )}
      </div>
    </div>
  );
}

const enhance: HOC<*, *> = compose(
  getContext({ appContext: () => null }),
  withRouter,
  withStateHandlers(
    () => ({
      password: '',
      loading: false,
      error: (null: ?string),
    }),
    {
      onChange: (prevState) => (event) => {
        const password = event.target.value;
        return {
          ...prevState,
          password,
          error: null,
        };
      },
      onLoading: (prevState) => () => ({ ...prevState, loading: true }),
      onDone: (prevState) => () => ({ ...prevState, loading: false }),
      onError: (prevState) => (error) => ({
        ...prevState,
        loading: false,
        error: `Unlock failed: ${sanitizeError(error).clientMessage}`,
      }),
    },
  ),
  withHandlers({
    onSubmit: ({
      history,
      wallet,
      password,
      onLoading,
      onDone,
      onError,
      forward,
      appContext: appContextIn,
    }) => () => {
      const appContext = ((appContextIn: $FlowFixMe): AppContext);
      onLoading();
      webLogger.info({ title: 'neotracker_wallet_unlock_keystore' });
      walletAPI
        .unlockWallet({
          appContext,
          id: wallet.userAccount.id,
          password,
        })
        .then(() => {
          onDone();
          if (forward) {
            history.push(routes.WALLET_HOME);
          }
        })
        .catch((error) => {
          webLogger.error({ title: 'neotracker_wallet_unlock_keystore' });
          onError(error);
        });
    },
  }),
  withStyles(styles),
  pure,
);

export default (enhance(UnlockWallet): React.ComponentType<ExternalProps>);
