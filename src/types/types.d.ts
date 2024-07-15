interface Link {
  _id: string;
  index_title: string;
  category: string;
  type: string;
  ref: string;
  anchorRef: string;
  anchorRefExpanded: string[];
  sourceRef: string;
  sourceHeRef: string;
  anchorVerse: string;
  compDate: number[];
  collectiveTitle: { he: string; en: string };
  heTitle: string;
  he: string;
}
