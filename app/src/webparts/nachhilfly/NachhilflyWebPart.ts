// Einstieg des Webparts: Kontext lesen, Dienst wählen, <App/> rendern (docs/ARCHITEKTUR.md §3).
// T-1.1: nur das Gerüst. Dienst und App kommen in T-1.4 und folgenden Aufgaben.
import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import Nachhilfly from './components/Nachhilfly';

export default class NachhilflyWebPart extends BaseClientSideWebPart<Record<string, never>> {
  private _root: Root | undefined;

  public render(): void {
    if (!this._root) {
      this._root = createRoot(this.domElement);
    }
    this._root.render(React.createElement(Nachhilfly));
  }

  protected onDispose(): void {
    this._root?.unmount();
    this._root = undefined;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
