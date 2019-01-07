import { branch, renderComponent } from 'recompose';
import Spinner from '@soundnode-redux/client/src/common/components/spinners/RectsScale';

export function renderSpinnerUntil(isLoading) {
  return branch(
    isLoading,
    renderComponent(Spinner), // `Spinner` is a React component
  );
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
