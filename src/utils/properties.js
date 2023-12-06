export const propertiesTableSkeleton = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'title', headerName: 'Title', width: 130},
    {field: 'description', headerName: 'Description', width: 130},
    {field: 'type', headerName: 'Type'},
    {field: 'price', headerName: 'Price'},
    {field: 'location', headerName: 'Location'},
    {field: 'floor_number', headerName: 'Floor Number'},
    {field: 'published', headerName:  'Is Published'},
    {field: null, headerName: 'Actions'}
];

export const propertyFields = [
    'id',
    'title',
    'description',
    'pic',
    'price',
    'location',
    'floor_number',
    'number_of_rooms',
    'with_parking',
    'type',
    'contract',
    'payment_process',
    'safety',
    'quadrature',
    'description',
    'is_top',
    'is_featured',
    'is_best_deal',
    'created_by',
    'published',
    'created_at',
    'updated_at'

];

export function parseNullPropertyFieldsFromBe(property) {
    Object.keys(property).forEach(key => {
        if (property[key] === null) {
            delete property[key];
        }
    });

    return property;
}

export function parseIntValuesFromPropertyFieldsFromBe(property) {
    property.is_best_deal = property.is_best_deal !== 0;
    property.is_featured = property.is_featured !== 0;
    property.is_top = property.is_top !== 0;
    property.published = property.published !== 0;
    property.with_parking = property.with_parking !== 0;

    return property;
}