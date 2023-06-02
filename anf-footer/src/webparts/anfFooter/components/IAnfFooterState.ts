import { IListItemAnfFooter, IBlockedItem } from "./IAnfFooterProps";

export interface IAnfFooterState {
  loading: boolean;
  items: IListItemAnfFooter[];
  itemsBlock: IBlockedItem;
}
