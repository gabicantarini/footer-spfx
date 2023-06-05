import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AnfFooterWebPartStrings';
import AnfFooter from './components/AnfFooter';
import { IAnfFooterProps } from './components/IAnfFooterProps';
import { IAnfFooterState } from './components/IAnfFooterState';
import { sp } from '@pnp/sp';


export interface IAnfFooterWebPartProps {
  helpSectionTitle: string;
  helpSectionText: string;
  description: string;
  helpSectionButtonText: string;
}

export default class AnfFooterWebPart extends BaseClientSideWebPart<IAnfFooterWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IAnfFooterProps> = React.createElement(
      AnfFooter,
      {
        helpSectionTitle: this.properties.helpSectionTitle,
        helpSectionText: this.properties.helpSectionText,
        description: this.properties.description,
        helpSectionButtonText: this.properties.helpSectionButtonText,
        wpContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //@ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description Field'
                }),

                PropertyPaneTextField('helpSectionTitle', {
                  label: 'Help Section Title Field'
                }),

                PropertyPaneTextField('helpSectionText', {
                  label: 'Help Section Text Field'
                }),

                PropertyPaneTextField('helpSectionButtonText', {
                  label: 'Help Section Button Text Field'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
