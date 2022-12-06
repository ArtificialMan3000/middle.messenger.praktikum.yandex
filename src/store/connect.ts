import { TState } from './types';
import { TClass, TComponentPropsType, TConstructor } from '~/src/typings/utils';
import type {
  Component,
  IComponentConstructor,
  TComponentProps,
} from '~/src/view/Component';
import { store, StoreEvents } from './Store';
import { isEqual } from '../utils/functions';

export function connect<TProps extends Record<string, unknown>>(
  mapStateToProps: (state: TState) => Record<string, unknown>
) {
  return function connectComponent(
    ComponentClass: IComponentConstructor<TProps>
  ): IComponentConstructor<TProps> {
    return class ConnectedComponent extends ComponentClass {
      constructor(
        ...args: ConstructorParameters<IComponentConstructor<TProps>>
      ) {
        const [props, ...restArgs] = args;
        let propsFromState = mapStateToProps(store.getState());
        super({ ...props, ...propsFromState }, ...restArgs);

        store.on(StoreEvents.Updated, () => {
          const newPropsFromState = mapStateToProps(store.getState());

          if (!isEqual(propsFromState, newPropsFromState)) {
            this.setProps({ ...mapStateToProps(store.getState()) });
          }

          propsFromState = newPropsFromState;
        });
      }
    };
  };
}
