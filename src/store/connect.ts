import { TState } from './types';
import { TComponentPropsType, TConstructor } from '~/src/typings/utils';
import type { Component as BaseComponent } from '~/src/view/Component';
import { store, StoreEvents } from './Store';
import { isEqual } from '../utils/functions';

export function connect(
  mapStateToProps: (state: TState) => Record<string, unknown>
) {
  return function connectComponent(Component: TConstructor<BaseComponent>) {
    return class extends Component {
      constructor(
        props: TComponentPropsType<BaseComponent>,
        ...args: ConstructorParameters<typeof Component>
      ) {
        let propsFromState = mapStateToProps(store.getState());
        super({ ...props, ...propsFromState }, ...args);

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
