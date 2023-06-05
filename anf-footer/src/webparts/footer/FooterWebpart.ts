import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IFooterContextProps } from './components/IFooterProps';
import { FooterContext } from './components/FooterContext';
import { Footer } from './components/Footer';

export interface IFooterWebPartProps {}

export default class FooterWebPart extends BaseClientSideWebPart<IFooterWebPartProps> {
  public async onInit(): Promise<void> {
    sp.setup(this.context);
    await super.onInit();
  }

  public render(): void {
    const element: React.ReactElement = React.createElement(Footer, {});

    const provider: React.FunctionComponentElement<React.ProviderProps<IFooterContextProps>> = React.createElement(
      FooterContext.Provider,
      {
        children: element,
        value: {
          wpContext: this.context
        }
      }
    );

    ReactDom.render(provider, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: ''
          },
          groups: [
            {
              groupFields: []
            }
          ]
        }
      ]
    };
  }
}
