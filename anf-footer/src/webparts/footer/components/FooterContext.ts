import { createContext } from 'react';
import { IFooterProps } from './IFooterProps';

/**
 * @summary Para usar o contexto, declarar no componente:
 * @example
 * const context = useContext(FooterContext);
 *
 * @summary Meter o componente como filho do provider:
 * @example
 * <FooterContext.Provider value={{ wpContext: this.props.spContext }}>
 *    <CustomComponent>
 * </FooterContext.Provider>
 */
export const FooterContext: React.Context<IFooterContextProps> = createContext<IFooterContextProps>({
  wpContext: undefined
});
