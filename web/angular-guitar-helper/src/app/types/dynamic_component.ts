import {ComponentType} from '@angular/cdk/portal';
import {ViewContainerRef} from '@angular/core';

/**
 * Interface representing a component that can be dynamically initialized using ViewContainerRef.
 *
 * This interface defines the structure for a component that can be added to a top bar or similar UI
 * element. It includes the component type and an optional initialization function that allows for
 * additional setup when the component is created.
 *
 * @interface DynamicComponent
 *
 * @property {ComponentType<any>} component - The Angular component type that will be instantiated.
 * This should be a reference to a component class that is decorated with @Component.
 *
 * @property {(vcr: ViewContainerRef) => void} [init] - An optional initialization function that is
 * called with the ViewContainerRef when the component is created. This function can be used to
 * perform additional setup, such as passing inputs or binding events.
 *
 * @example
 * const myTopBarComponent: TopBarComponent = {
 *   component: MyCustomComponent,
 *   init: (vcr: ViewContainerRef) => {
 *     const instance = vcr.createComponent(MyCustomComponent).instance;
 *     instance.someInput = 'Some Value';
 *   }
 * };
 */
export interface DynamicComponent<T> {
  component: ComponentType<T>,
  init?: (vcr: ViewContainerRef, component: ComponentType<T>) => void
}
