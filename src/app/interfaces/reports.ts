
export interface ItemBasic {
  id: number;
  name: string;
  description: string;
  value: string;
  type: string;
}

export const viewBuilder_TypeLookup = [
	"range",
	"number",
	"string"
]

export const aggregateFunctions = [
  {
    id: 1,
    name: "SUM",
    description: "Calculates the sum of a numeric column for each group.",
  },
  {
    id: 2,
    name: "AVG",
    description: "Computes the average of a numeric column for each group.",
  },
  {
    id: 3,
    name: "COUNT",
    description: "Counts the number of rows in each group.",
  },
  {
    id: 4,
    name: "MIN",
    description: "Finds the minimum value of a column for each group.",
  },
  {
    id: 5,
    name: "MAX",
    description: "Retrieves the maximum value of a column for each group.",
  },
  {
    id: 6,
    name: "STDEV",
    description: "Calculates the standard deviation of a numeric column for each group.",
  },
  {
    id: 7,
    name: "STDEVP",
    description: "Computes the standard deviation of a population for a numeric column in each group.",
  },
  {
    id: 8,
    name: "VAR",
    description: "Calculates the variance of a numeric column for each group.",
  },
  {
    id: 9,
    name: "VARP",
    description: "Computes the variance of a population for a numeric column in each group.",
  },
];

export interface viewBuilder_Groups {
	id: number;
	name: string;
	description: string;
}

export interface viewBuilder_Report {
	id: number;
	viewBuilder_ViewListID: number;
	name: string;
	json: string;
  userTypes: unknown[]
	viewBuilder_reportType: number;
}

export interface viewBuilder_ReportTypes {
	id: number;
	name: string;
	chartType: string;
	chartDeveloper: string;
	description: string;
}

//can be overridden;
export const viewBuilderList = [
  {id:1, name: 'Item Sales',  viewNameValue: 'Reports_ItemSales', viewBuilder_ReportTypeID: 1},
  {id:2, name: 'Orders History',  viewNameValue: 'Orders', viewBuilder_ReportTypeID: 2},
  {id:3, name: 'Orders Current',  viewNameValue: 'POSOrders', viewBuilder_ReportTypeID: 2},
  {id:6, name: 'Payments History',  viewNameValue: 'payments', viewBuilder_ReportTypeID: 3},
  {id:7, name: 'Payments Current',  viewNameValue: 'pospayments', viewBuilder_ReportTypeID: 3},
  {id:4, name: 'Menu',  viewNameValue: 'APIMenu', viewBuilder_ReportTypeID: 5},
  {id:5, name: 'METRC',  viewNameValue: 'metrcSalesReport', viewBuilder_ReportTypeID: 8},
  {id:5, name: 'Customers & Entities',  viewNameValue: 'clients', viewBuilder_ReportTypeID: 8},
]   as viewBuilder_ViewList[];

//can be overridden
export const viewBuilder_ReportGroups = [
	{id: 1, name: "Item Sales"},
	{id: 2, name: "Order Sales"},
	{id: 3, name: "Payments Sales"},
	{id: 4, name: "Customers & Entities"},
	{id: 5, name: "Inventory"},
  {id: 6, name: "Menu"},
  {id: 7, name: "Tier Prices"},
  {id: 8, name: "METRC"},
]

/* generated */
export interface viewBuilder_ViewList {
	id: number;
	name: string;
  viewBuilder_ReportTypeID: number;
	viewNameValue: string;
}

export interface viewBuilder_ReportJSON {
	id: number;
	name: string;
	viewBuilder_GroupsID: number;
	viewBuilder_viewListID: number;
	description: string;
	fields: viewBuilder_View_Field_Values[];
	where:  viewBuilder_Where_Selector[];
	groups: viewBuilder_View_Builder_GroupBy[];
	orderBy: viewBuilder_View_Field_Values[];
}

/*
field type options determine if the field
should be calculated or not.
*/
export interface viewBuilder_View_Field_Values {
	id: number;
	type: string;
	name: string;
	fieldTypeAggregate: string; //
}

/*calcluated
can be sum, or no value.
or other allowed values.
*/
export interface viewBuilder_AggregateFunction {
  id: number;
  name: string;
  description: string;
}

/*values for viewBuilder Report */
/*
values for where_Selector
andOrGroupNumber applies
to each group that the and/or values can be part of
 */
export interface viewBuilder_Where_Selector {
	id: string;
	viewBuilder_ReportID: number;
  name: string;
	whereType: string;
  whereCondition: string;
  andOr: string;
	andOrGroupNumber: number;
  andOrGroup: string;
}

export interface whereType {
  name: string;
}

export const whereTypeList = [
  {name: '='},
  {name: 'Between'},
  {name: '>'},
  {name: '<'},
  {name: '=>'},
  {name: '<='},
]

export interface viewBuilder_View_Builder_GroupBy {
	id: number;
	viewBuilder_ReportID: number;
	name: string;
}

export const chartTypeCollection  = [
  { type: "Data List" , icon: '' },
  { type: "arcdiagram" , icon: '' },
  { type: "area" , icon: '' },
  { type: "arearange" , icon: '' },
  { type: "areaspline" , icon: '' },
  { type: "areasplinerange" , icon: '' },
  { type: "bar" , icon: 'bar_chart' },
  { type: "bellcurve" , icon: '' },
  { type: "boxplot" , icon: '' },
  { type: "bubble" , icon: 'bubble_chart' },
  { type: "bullet" , icon: '' },
  { type: "column" , icon: '' },
  { type: "columnpyramid" , icon: '' },
  { type: "columnrange" , icon: '' },
  { type: "cylinder" , icon: '' },
  { type: "dependencywheel" , icon: '' },
  { type: "dumbbell" , icon: '' },
  { type: "errorbar" , icon: '' },
  { type: "funnel" , icon: '' },
  { type: "funnel3d" , icon: '' },
  { type: "gauge" , icon: '' },
  { type: "heatmap" , icon: '' },
  { type: "histogram" , icon: '' },
  { type: "item" , icon: '' },
  { type: "line" , icon: 'show_chart' },
  { type: "lollipop" , icon: '' },
  { type: "networkgraph" , icon: '' },
  { type: "organization" , icon: '' },
  { type: "packedbubble" , icon: '' },
  { type: "pareto" , icon: '' },
  { type: "pie" , icon: 'pie_chart' },
  { type: "polygon" , icon: '' },
  { type: "pyramid" , icon: '' },
  { type: "pyramid3d" , icon: '' },
  { type: "sankey" , icon: '' },
  { type: "scatter" , icon: 'scatter_chart' },
  { type: "scatter3d" , icon: '' },
  { type: "solidgauge" , icon: '' },
  { type: "spline" , icon: '' },
  { type: "streamgraph" , icon: '' },
  { type: "sunburst" , icon: '' },
  { type: "tilemap" , icon: '' },
  { type: "timeline" , icon: '' },
  { type: "treemap" , icon: '' },
  { type: "variablepie" , icon: '' },
  { type: "variwide" , icon: '' },
  { type: "vector" , icon: '' },
  { type: "venn" , icon: '' },
  { type: "waterfall" , icon: '' },
  { type: "windbarb" , icon: '' },
  { type: "wordcloud" , icon: '' },
  { type: "xrange" , icon: '' },
]
