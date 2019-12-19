function vuetable(gene) {

  $.get(`http://0.0.0.0:5000/alteration/${gene}`,function (data) {
      // console.log(data);
      var obj= jQuery.parseJSON(JSON.stringify(data));
      console.log(obj[0]['spc32_no_msi_v8']);
      var table = $('#example').DataTable( {
        data: obj,
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
          {extend:'csvHtml5',
          text:      '<i class="far fa-save"></i>'}],
          // {extend:'colvis',
          // text: "<i class=\"fas fa-columns\"></i>"}],
        columns: [
          {   title: "SFE-1",
              data : "SFE_1"
          },
          { title: "SFE-2",
            data : "SFE_2"},
          {
            title: "Gene 1",
            data: "gene_1"
          },
          {
            title: "Gene 2",
            data: "gene_2"
          },
          {
            title: "pca_v3",
            data: "spca_v3",
          },
          {
            title: "pc24_v5",
            data: "spc24_v5",
          },
          {
            title: "pc32_no_msi_v8",
            data: "spc32_no_msi_v8",
          },
          {
            title: "pc32_v8",
            data: "spc32_v8",
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
        "createdRow": function ( row, data, index ) {

          if (data['pca_v3']=='ME')
          {
            $('td', row).eq(4).addClass('w3-purple w3-white-text')
          }
          else if (data['pca_v3']=='CO')
          {
            $('td', row).eq(4).addClass('w3-green w3-white-text')
          }
          else if (data['pca_v3']=='none')
          {
            $('td', row).eq(4).addClass('w3-black w3-white-text')
          }
          else
          {
            $('td', row).eq(4).addClass('w3-white w3-black-text')
          }

          if (data['pc24_v5']=='ME')
          {
            $('td', row).eq(5).addClass('w3-purple w3-white-text')
          }
          else if (data['pc24_v5']=='CO')
          {
            $('td', row).eq(5).addClass('w3-green w3-white-text')
          }
          else if (data['pc24_v5']=='none')
          {
            $('td', row).eq(5).addClass('w3-black w3-white-text')
          }
          else
          {
            $('td', row).eq(5).addClass('w3-white w3-black-text')
          }

          if (data['pc32_no_msi_v8']=='ME')
          {
            $('td', row).eq(6).addClass('w3-purple w3-white-text')
          }
          else if (data['pc32_no_msi_v8']=='CO')
          {
            $('td', row).eq(6).addClass('w3-green w3-white-text')
          }
          else if (data['pc32_no_msi_v8']=='none')
          {
            $('td', row).eq(6).addClass('w3-black w3-white-text')
          }
          else
          {
            $('td', row).eq(6).addClass('w3-white w3-black-text')
          }

          if (data['pc32_v8']=='ME')
          {
            $('td', row).eq(7).addClass('w3-purple w3-white-text')
          }
          else if (data['pc32_v8']=='CO')
          {
            $('td', row).eq(7).addClass('w3-green w3-white-text')
          }
          else if (data['pc32_v8']=='none')
          {
            $('td', row).eq(7).addClass('w3-black w3-white-text')
          }
          else
          {
            $('td', row).eq(7).addClass('w3-white w3-black-text')
          }


          // if (data['direction'] === 'ME') {
          //   $('td', row).eq(5).addClass('w3-purple w3-white-text')
          // }
          // else if (data['direction'] === 'CO') {
          //   $('td', row).eq(5).addClass('w3-green w3-white-text')
          // }
          // else
          // {
          //   $('td', row).eq(5).addClass('w3-black w3-white-text')
          // }
          //
          // var temp = data['dataset'].split(",").length;
          // if (temp === 1)
          // {
          //   $('td', row).eq(6).html("<i class=\"w3-large fas fa-check\"></i>")
          // }
          // else if (temp === 2)
          // {
          //   $('td', row).eq(6).html("<i class=\"w3-large fas fa-check\"></i>&nbsp<i class=\"w3-large fas fa-check\"></i>")
          // }
          // else if (temp === 3)
          // {
          //   $('td', row).eq(6).html("<i class=\"w3-large fas fa-check\"></i>&nbsp<i class=\"w3-large fas fa-check\"></i>&nbsp<i class=\"w3-large fas fa-check\"></i>")
          // }
          // else if (temp === 4)
          // {
          //   $('td', row).eq(6).html("<i class=\"w3-large fas fa-check\"></i>&nbsp<i class=\"w3-large fas fa-check\"></i>&nbsp<i class=\"w3-large fas fa-check\"></i>&nbsp<i class=\"w3-large fas fa-check\"></i>")
          // }

        }
          // if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {
          //   $('td', row).eq(5).addClass('highlight');
          // }}
      });
      table.buttons().container()
        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
         table.order( [[ 4, 'desc' ],[ 5, 'desc' ],[ 6, 'desc' ],[ 7, 'desc' ]] ).draw();
      $('#example tbody').on( 'click', 'button', function () {
            var data = table.row( $(this).parents('tr') ).data();
            localStorage.setItem("alteration", JSON.stringify(data));
            window.location = "additional_details.html";
        });
  },"json");
}
