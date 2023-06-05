import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ISearchResult } from '@pnp/sp/search';


export interface IFooterProps {
  wpContext: WebPartContext;
}

export enum Profile {
  Administrator = 1,
  Colaborator = 2,
  OtherColaborator = 3,
  ColaboratorFinance = 4
}

export interface ISearchResultArticle extends ISearchResult {
  FooterLeadOWSMTXT: string;
  FooterTagsRefStr: string;
  FooterThumbnailImageOWSIMGE: string;
  FooterImageOWSIMGE: string;
  FooterImageBodyOWSIMGE: string;
  FooterPublicationDateOWSDATE: string;
}
