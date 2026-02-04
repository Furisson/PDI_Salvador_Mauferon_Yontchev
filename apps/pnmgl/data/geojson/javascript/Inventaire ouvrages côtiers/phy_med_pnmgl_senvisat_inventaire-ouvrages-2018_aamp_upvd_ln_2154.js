
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Inventaire ouvrages côtiers/phy_med_pnmgl_senvisat_inventaire-ouvrages-2018_aamp_upvd_ln_2154.geojson',
        format: new ol.format.GeoJSON()

    }),

    // style: new ol.style.Style({
    //     stroke: new ol.style.Stroke({
    //       color: "rgba(46,83,103,0.6)",
    //       width: 1,
    //     }),
    //     fill: new ol.style.Fill({
    //       color: "rgba(0, 0, 0, 0)",
    //     }),
    // }),
});

new CustomLayer('phy_med_pnmgl_senvisat_inventaire-ouvrages-2018_aamp_upvd_ln_2154', layer);
