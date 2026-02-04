// CustomLayer

// Ce fichier est un exemple ou fichier basique afin d'ajouter un custom layer.
// dans la configuration du layer il faut adapter les éléments suivants:
// url: mettre le bon chemin d'accès avec le nom du fichier
// style: mettre le bon format de style en fct du type de donnée (ces styles sont personnaliables)
// id_du_layer : identifiant du layer dans l'application XML, fait le lien avec le fichier XML


// concernant, le style, afin d'ajouter une légende il est sans doute possible d'ajouter une légende en en ajoutant une dans le layer ci dessous. 
// Nous n'avons pas réussi, la légende se gère donc à l'aide d'un fichier SVG contenant le symbole (dans img) et intégré grâce à la balise legendurl du XML
// S'il existe un tel fichier, on peut également donner directement ce fichier comme style pour un ponctuel

// définitions de styles en fonction du type de donnée (modifier celui concerné par la donnée, d'autres attributs sont disponibles)



let style_ponctuel= new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgb(0, 47, 255)",
      width: 2,
    })

});

// S'il existe un fichier SVG qui décrit le style voulu du ponctuel
//
// let style_ponctuel = new ol.style.Style({
//     image: new ol.style.Icon({
//         src: "apps/pnmgl/img/epave2.png", // lien vers l'icône
//         scale: 0.8 // Ajuster la taille de l'icône
//     })
// });


let style_surfacique = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(46,83,103,0.6)",
      width: 1,
    }),
    fill: new ol.style.Fill({
      color: "rgba(0, 0, 0, 0)",
    }),
});

let style_linéaire= new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgb(0, 47, 255)",
      width: 2,
    })

});

// Création du layer 
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/chemin_d_acces/fichier.geojson',
        format: new ol.format.GeoJSON()

    }),

    // choisir le bon style (décommenter)
    // style: style_surfacique,
    // style: style_ponctuel,
    // style: style_linéaire,

});


// certaines données nécessitent d'être reprojetées dans le bon système de projection, si les données ne s'affichent pas au bon endroit,
//  configurez et décommentez le code ci-dessous :

// layer.getSource().on('addfeature', function(event) {
//     const feature = event.feature;
//     const geometry = feature.getGeometry();
    
//     if (geometry) {
//         // Transformation de la géométrie de EPSG:2154 vers EPSG:3857
//         geometry.transform('EPSG:2154', 'EPSG:3857');
//     }
// });

new CustomLayer('id_du_layer', layer);



