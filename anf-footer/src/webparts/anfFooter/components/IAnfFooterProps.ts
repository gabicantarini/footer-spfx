import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IAnfFooterProps {

  helpSectionTitle: string;
  helpSectionText: string;
  helpSectionButtonText: string;
  description: string;
  wpContext: WebPartContext;

}

export interface IListItemAnfFooter {

  title: string;
  group: string;
  listLink: string;
  order: number;
  active: boolean;

}

export interface IBlockedItem {
  [key: string]: IListItemAnfFooter[]; //dynamic object key
}

//first block has an object called first block and can have more properties like second block and on...
