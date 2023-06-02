import * as React from 'react';
import { IAnfFooterProps, IListItemAnfFooter, IBlockedItem } from './IAnfFooterProps';
import { IAnfFooterState } from './IAnfFooterState';
import './AnfFooter.scss';
//import { data } from "./data";
import { sp } from '@pnp/sp';
import logo from './images/logo_footer.svg';
import sphere from './images/sphere.png';
import sgs from './images/sgs.svg';


export default class AnfFooter extends React.Component<IAnfFooterProps, IAnfFooterState> {
  public constructor(props: IAnfFooterProps) {
    super(props);
    this.state = {
      loading: true,
      items: null, //warning pede para usar undefined insted of null
      itemsBlock: {}
    };
  }

  public goToTop = () => {
    document.body.scrollTop = 0,
    document.documentElement.scrollTop = 0
  }

  public componentDidMount() {

    const listUrl = this.props.wpContext.pageContext.site.serverRelativeUrl + '/Lists/anf_Footer/';
    sp
      .site
      .rootWeb
      .getList(listUrl)
      .select('Title', 'Grupo', 'Link', 'Ordem', 'Ativo')
      .items
      .get()
      .then((spItems: any[]) => {
        const listItems = spItems.map(item => {
          return {
            title: `${item.Title}`,
            group: item.Grupo,
            listLink: item.Link.Url,
            order: item.Ordem,
            active: item.Ativo
          } as IListItemAnfFooter;
        });

        // MAP RETORNA FIRST AND SECOND BLOCK GROUP
        const blockedItems: IBlockedItem = {}; // blockedItems use this type of data
        listItems.map(item => { //listItems = ['Block Title', 'Shortcuts']
          if (!blockedItems[item.group]) { //se nao existir a propriedade
            blockedItems[item.group] = []; //cria a propriedade e inicializa a prop com array vazio
          }
          blockedItems[item.group].push(item);
        });

        console.log('teste MAP', blockedItems)


        this.setState({
          loading: false,
          itemsBlock: blockedItems
        });

      }).catch((err) => {
        console.error(err);
        this.setState({
          loading: false
        });
      });
  }

  public getYear() {
    return new Date().getFullYear();
  }


  public render(): React.ReactElement<IAnfFooterProps> {

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <footer className='footer footer-style'>
        <div className='container-lgLeft'>
          <div className='footer-content'>
            <div className='footer-leftSide'>
              <h1>{this.props.description}</h1>
              <div className='footer-footerLinks'>
                {Object.keys(this.state.itemsBlock).map(group => {
                  return (
                    <div>
                      <h2>{group}</h2>
                      {console.log('teste group', group)}
                      {this.state.itemsBlock[group].map((item, index) =>
                        <a href={item.listLink} key={index}>
                          <span>{item.title}</span>
                        </a>
                      )}
                    </div>
                  );
                })}
                <div className='helpSection'>
                  <h2>{this.props.helpSectionTitle}</h2>
                  <p>{this.props.helpSectionText}</p>
                  <div className='helpSection-button'>
                    <i className='fal fa-comment'></i>
                    <span>{this.props.helpSectionButtonText}</span>
                  </div>
                </div>
              </div>
              <div className='footer-bottom'>
                <div>
                  <img src={sgs} alt='image sgs' />
                </div>
                <div className='footer-copyright'>
                  <span> ©{this.getYear()} All rights reserved </span>
                </div>
              </div>
            </div>
            <div className='footer-rightSide'>
              <div className='footer-sphere'>
                <img src={sphere} alt='image sphere' />
                <img src={this.props.wpContext.pageContext.site.serverRelativeUrl + '/Style Library/ANF/logos/logo_footer.svg'} alt='image logo' />
              </div>
            </div>
          </div>
        </div>
        <div className={'footer-go-top'} onClick={this.goToTop} >
          <i className='fal fa-arrow-to-top'></i>
        </div>
      </footer>
    );
  }
}
