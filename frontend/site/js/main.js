// Author: Arvind Iyer
// Email: ayalurarvind@gmail.com
// Desc: Main app file
// Version: 0.0.1

// Global variables
var client_url = 'http://0.0.0.0:8080/'
var server_url = 'http://0.0.0.0:5000/'

// Common functions

// Used to toggle the menu on small screens when clicking on the menu button Ref: w3-schools
function menu() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
// used for the additional details tab Ref: w3-schools
function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}
// Autocomplete function Ref: w3-schools
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
// Function to get radio button value
function getRadioVal(form, name) {
        var val;
        // get list of radio buttons with specified name
        var radios = form.elements[name];
        // loop through list of radio buttons
        for (var i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked ) { // radio checked?
                val = radios[i].value; // if so, hold its value in val
                break; // and break out of for loop
            }
        }
        return val; // return value of checked radio or undefined if none checked
}
function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}
// Functio to accumlate the data tables
function vuetable(gene) {
  var api = server_url.concat(`alteration/${gene}`);
  $.get(api,function (data) {
      console.log(data);
      var obj= jQuery.parseJSON(JSON.stringify(data));
      var table = $('#example').DataTable( {
        data: obj,
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
          {
            extend:'csvHtml5',
            text:      '<i class="far fa-save"></i>'
          }
        ],
        columns: [
          { title: "SFE-1",
            data : "SFE_1",
            width: "20%"
          },
          { title: "SFE-2",
            data : "SFE_2",
            width: "20%"},
          {
            title: "Gene 1",
            data: "gene_1"
          },
          {
            title: "Gene 2",
            data: "gene_2"
          },
          {
            title: "Direction",
            data: "direction",
          },
          {
            title: "Select Score",
            data: "APC",
            render: function(data,type,row){
              return expo(data,2);
            }

          },
          {
            title: "wMI p-value",
            data: "wMI_p_value",
            render: function(data,type,row){
              return expo(data,2);
            }

          },          
          {
            title: "Significance",
            data: "significance",
          },
          {
            title: "Tumor Count",
            data: "n",
          },
          {
            title: "More Details",
            "data": null,
            "defaultContent": "<button type='button' class='w3-btn w3-blue w3-round'><i class=\"fas fa-info\"></i></button>"
          }
        ],
        language: {
          "emptyTable":     "No Mapped Entries"
        },
      });
      table.buttons().container()
        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
        table.order( [[ 5, 'desc' ],[ 7, 'desc' ], [8, 'desc' ]]).draw();
        $('#example tbody').on( 'click', 'button', function () {
            var data = table.row( $(this).parents('tr') ).data();
            localStorage.setItem("alteration", JSON.stringify(data));
            window.location = "additional_details.html";
        });
  },"json");
}

// Functio to accumlate the data tables for gene search additional page
function table_additional(gene) {
  var api = server_url.concat(`alteration/motif/${gene}`)
  $.get(api,function (data) {
      console.log(data);
      var obj= jQuery.parseJSON(JSON.stringify(data));
      var table = $('#alteration_table').DataTable( {
        data: obj,
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
          {
            extend:'csvHtml5',
            text: '<i class="far fa-save"></i>'
          }
        ],
        columns: [
          { title: "SFE-1",
            data : "SFE_1",
          },
          { title: "SFE-2",
            data : "SFE_2",
          },
          {
            title: "Gene 1",
            data: "gene_1"
          },
          {
            title: "Gene 2",
            data: "gene_2"
          },
          {
            title: "Direction",
            data: "direction",
          },
          {
            title: "Select Score",
            data: "APC",
            render: function(data,type,row){
              return expo(data,2);
            }
          },
          {
            title: "wMI p-value",
            data: "wMI_p_value",
            render: function(data,type,row){
              return expo(data,2);
            }

          },          
          {
            title: "Significance",
            data: "significance",
          },
          {
            title: "Cancer",
            data: "cancer",
          },
          {
            title: "Max Overlap",
            data: "max_overlap",
          },
          {
            title: "Frequency Overlap",
            data: "freq_overlap",
            render: function(data,type,row){
              return expo(data,2);
            }
          }
        ],
        language: {
          "emptyTable":     "No Mapped Entries"
        },
      });
      table.buttons().container()
        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
        table.order( [[ 5, 'desc' ],[ 7, 'desc' ], [8, 'desc' ]]).draw();
        // $('#example tbody').on( 'click', 'button', function () {
        //     var data = table.row( $(this).parents('tr') ).data();
        //     localStorage.setItem("alteration", JSON.stringify(data));
        //     window.location = "additional_details.html";
        // });
  },"json");
  var api = server_url.concat(`alteration/screening/${gene}`)
  console.log(api)
  $.get(api,function (data) {
      console.log(data);
      var obj= jQuery.parseJSON(JSON.stringify(data));
      var table = $('#screeing_table').DataTable( {
        data: obj,
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            { extend:'csvHtml5',
              text:      '<i class="far fa-save"></i>'},
            // { extend:'colvis',
            //   text: "<i class=\"fas fa-columns\"></i>"},
        ],
        columns: [
          { title: "SFE-1",
            data : "SFE_1",
          },
          { title: "SFE-2",
            data : "SFE_2",
          },
          {
            title: "Gene 1",
            data: "gene_1"
          },
          {
            title: "Gene 2",
            data: "gene_2"
          },
          {
            title: "Direction",
            data: "direction"
          },
          {
            title: "Knockout Gene",
            data: "ko_gene",
          },
          {
            title: "lev",
            data: "lev",
          },
          {
            title: "reduce_dep",
            data: "reduce_dep",
          },
          {
            title: "p_anova",
            data: "p_anova",
          },
          {
            title: "bf",
            data: "bf",
          },
          {
            title: "important_diff",
            data: "important_diff",
            render: function(data,type,row){
              return expo(data,2);
            }          },
          {
            title: "important_posthoc_anova_p",
            data: "important_posthoc_anova_p",
            render: function(data,type,row){
              return expo(data,2);
            }
          },
          {
            title: "important_normalized_effect_diff",
            data: "important_normalized_effect_diff",
            render: function(data,type,row){
              return expo(data,2);
            }          },
          {
            title: "important_posthoc_bf_direct",
            data: "important_posthoc_bf_direct",
            render: function(data,type,row){
              return expo(data,2);
            }          },
          {
            title: "important_posthoc_bf_indirect",
            data: "important_posthoc_bf_indirect",
            render: function(data,type,row){
              return expo(data,2);
            }
          },
          {
            title: "experiment",
            data: "experiment",
          },
          {
            title: "Show Plot",
            "data": null,
            "defaultContent": "<button type='button' class='w3-btn w3-blue w3-round'><i class=\"fas fa-info\"></i></button>"
          }

        ],
        language: {
          "emptyTable":     "No Mapped Entries"
        },
      });
      table.buttons().container()
        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
        $('#screeing_table tbody').on( 'click', 'button', function () {
            var data = table.row( $(this).parents('tr') ).data();
            image_create();
            function image_create()
            { 
                var path="img/"
                path = path.concat(data['input_motif'].replace('/','--'))
                path =path.concat("__")
                path =path.concat(data['gene_pair_ko'])
                path =path.concat("__")
                path =path.concat(data['experiment'])
                path =path.concat('_gene_level_GOOD.png')
                $("#screeing_image").attr("src", path);
            }
        });
  },"json");
}
// Functio for population tumor table
function vuetable_tumor(gene) {
  var api = server_url.concat(`tumor/${gene}`);
  $.get(api,function (data) {
      console.log(data);
      var obj= jQuery.parseJSON(JSON.stringify(data));
      var table = $('#tumor').DataTable( {
        data: obj,
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
          {
            extend:'csvHtml5',
            text:      '<i class="far fa-save"></i>'
          }
        ],
        columns: [
          { title: "SFE-1",
            data : "SFE_1",
          },
          { title: "SFE-2",
            data : "SFE_2",
          },
          {
            title: "Gene 1",
            data: "gene_1"
          },
          {
            title: "Gene 2",
            data: "gene_2"
          },
          {
            title: "Direction",
            data: "direction",
          },
          {
            title: "Select Score",
            data: "APC",
            render: function(data,type,row){
              return expo(data,2);
            }
          },
          {
            title: "wMI p-value",
            data: "wMI_p_value",
            render: function(data,type,row){
              return expo(data,2);
            }
          },          
          {
            title: "Significance",
            data: "significance",
          },
        ],
        language: {
          "emptyTable":     "No Mapped Entries"
        },
      });
      table.buttons().container()
        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
        table.order( [[ 5, 'desc' ],[ 6, 'desc' ], [7, 'desc' ]]).draw();
        $('#example tbody').on( 'click', 'button', function () {
            var data = table.row( $(this).parents('tr') ).data();
            localStorage.setItem("alteration", JSON.stringify(data));
        });
  },"json");
}
// gene network
function network() {
  var gene= localStorage.getItem("gene")
  var api = server_url.concat(`network/${gene}`);
  $.getJSON(api, function(result){
    if (result['nodes'].length === 0){
        var container = document.getElementById('mynetwork');
        container.innerHTML += "<p class='w3-center w3-padding-64'>No mapped network possible.</p>";
    }
    else
    {
       create_network(result);
    }
  });
  function  create_network(result){
    var nodes = new vis.DataSet(result['nodes']);
    var edges = new vis.DataSet(result['edges']);
    var data = {
      nodes: nodes,
      edges: edges
    };
    console.log(data);
    var container = document.getElementById('mynetwork');
    var options = {layout:{randomSeed:5},edges:{width: 2},nodes: {borderWidth: 3},interaction:{zoomView:false}};
    var network = new vis.Network(container, data, options);
    network.on("selectEdge", function (params) {
      var edgeId = params.edges;
      console.log('edgeId:', edgeId);
      // find corresponding edge
      var edge = edges.get( edgeId );
      console.log(edge)
      if ( edge ) {
      // found one!
      var from = edge[0].from;
      var   to = edge[0].to;
      var data ={'SFE_1':nodes.get(from).label,
                 'SFE_2':nodes.get(to).label,
                 'motif': nodes.get(from).label.concat(" - ").concat(nodes.get(to).label)}

      console.log(data)
      localStorage.setItem("alteration", JSON.stringify(data));
      window.location = "additional_details.html";
     }
    });
    network.on("selectNode", function (params){
      console.log(params);
    });
  }
}
// additional details network
function network1() {
  var gene= localStorage.getItem("gene")
  var api = server_url.concat(`network/${gene}`);
  $.getJSON(api, function(result){
    if (result['nodes'].length === 0){
        var container = document.getElementById('mynetwork');
        container.innerHTML += "<p class='w3-center w3-padding-64'>No mapped network possible.</p>";
    }
    else
    {
       create_network(result);
    }
  });
  function  create_network(result){
    var nodes = new vis.DataSet(result['nodes']);
    var edges = new vis.DataSet(result['edges']);
    var data = {
      nodes: nodes,
      edges: edges
    };
    console.log(data);
    var container = document.getElementById('mynetwork1');
    var options = {layout:{randomSeed:5},edges:{width: 2},nodes: {borderWidth: 3},interaction:{zoomView:false}};
    var network = new vis.Network(container, data, options);
    network.on("selectEdge", function (params) {
      var edgeId = params.edges;
      console.log('edgeId:', edgeId);
      // find corresponding edge
      var edge = edges.get( edgeId );
      console.log(edge)
      if ( edge ) {
      // found one!
      var from = edge[0].from;
      var   to = edge[0].to;
      console.log('From:', nodes.get(from).label);
      console.log('To:', nodes.get(to).label);
     }
    });
  }
}
// Main logic
if ($("body").data("title") === "index") {
    //console.log($("body").data("title"))
    // Place the logic pertaining to the page with title 'my_page_title' here...
    var val = getRadioVal( document.getElementById('searchForm'), 'options' );
    if (val === "gene"){
          var api = server_url.concat("gene");
          const genes = new Array();
          w3.getHttpObject(api, populate_list);
          function populate_list(data) {
            data.forEach(function (obj) {
              genes.push(obj['gene']);
            });
          }
          //console.log(genes)
          autocomplete(document.getElementById("keyword"), genes);
    }
    else if (val === "tumor"){
        var tumor =["LGG","PRAD","LAML","GBM","MESO","ACC","LIHC","CESC","SARC","OV","ESCA","PAAD","BRCA","LUAD","HNSC","UCEC","LUSC","CRC","BLCA","STAD","SKCM"]
        //console.log(tumor);
        autocomplete(document.getElementById("keyword"), tumor);
    }
    else{
      console.log('No match')
    }
    $('input[type="radio"]').on('click change', function(e) {
        var val = getRadioVal( document.getElementById('searchForm'), 'options' );
        //console.log(val);
        if (val === "gene"){
              var api = server_url.concat("gene");
              const genes = new Array();
              w3.getHttpObject(api, populate_list);
              function populate_list(data) {
                data.forEach(function (obj) {
                  genes.push(obj['gene']);
                });
              }
              //console.log(genes)
              autocomplete(document.getElementById("keyword"), genes);
        }
        else if (val === "tumor"){
          var tumor =["LGG","PRAD","LAML","GBM","MESO","ACC","LIHC","CESC","SARC","OV","ESCA","PAAD","BRCA","LUAD","HNSC","UCEC","LUSC","CRC","BLCA","STAD","SKCM"]
          //console.log(tumor);
          autocomplete(document.getElementById("keyword"), tumor);
        }
        else{
          console.log('No match')
        }
      });
    $('#searchForm').submit(function (e) { 
        e.preventDefault();
        var input = $('#keyword').val();
        var keyword = document.getElementById('keyword').value;
        var val = getRadioVal( document.getElementById('searchForm'), 'options' );
        if (val == 'gene'){
          // set the local storage for the search keyword
          localStorage.setItem("gene", keyword);
          // Take to overview result page
          var api = server_url.concat(`site/gene_result.html?gene=${keyword}`)
          window.location.replace(api);
        }
        else{
          localStorage.setItem("tumor", keyword);
          var api = server_url.concat(`site/tumor_result.html?tumor=${keyword}`)
          window.location.replace(api);
        }
    })
}
else if ($("body").data("title") === "gene_result")
{
    $( document ).ready(function() {
        var myVar;
        myVar = setTimeout(showPage, 3000);
    });

    function showPage() {
      var gene= localStorage.getItem("gene")
      console.log(gene)
      var api = server_url.concat(`gene/${gene}`)
      w3.getHttpObject(api, populate_gene_info);
      function populate_gene_info(data) {
        console.log(data[0]);
        w3.displayObject("gene_info",data[0])
      }
      vuetable(gene);
      network();
      document.getElementById("loader").style.display = "none";
      document.getElementById("myDiv").style.display = "block";
      document.getElementById("footer").style.display = "block";
    }
}
else if ($("body").data("title") === "alteration_info")
{
  $( document ).ready(function() {
        get_data();
    });
   function get_data() {
      var gene= localStorage.getItem("gene")
      var alternation_info = JSON.parse(localStorage.getItem("alteration"));
      var api = server_url.concat(`gene/${gene}`)
      w3.getHttpObject(api, populate_gene_info);
      function populate_gene_info(data) {
        w3.displayObject("gene_info",data[0])
      }
      try{
         console.log(alternation_info);
         var api = server_url.concat(`alteration/motif/${alternation_info['motif']}`)        
      }
      catch(err){
        console.log(err);
      }

      // console.log(api)
      w3.displayObject('alteration_info',alternation_info);
      w3.displayObject('alteration_info1',alternation_info);
      table_additional(alternation_info['motif']);
      //network1();
    } 
}
else if ($("body").data("title") === "tumor_result")
{
    $( document ).ready(function() {
        var myVar;
        myVar = setTimeout(showPage, 3000);
    });

    function showPage() {
      var tumor= localStorage.getItem("tumor")
      console.log(tumor)        
      w3.displayObject("tumor_info",{'tumor':tumor})
      vuetable_tumor(tumor);
      document.getElementById("loader").style.display = "none";
      document.getElementById("myDiv").style.display = "block";
      document.getElementById("footer").style.display = "block";
    }
}



 
