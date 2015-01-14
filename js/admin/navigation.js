jQuery(function ($) {
  $("body.appearance_page_navigation").each(function () {
    function update_navigation_options() {
      console.log("Updating navigation options...");

      //  absolute
      var show_from = $("input[name=nav\\[show\\]]:checked").attr('value');
      console.log('Show from: '+show_from);
      var show_from_levels = {
        "home": 0,
        "first": 1,
        "second": 2,
        "third": 3,
        "fourth": 4,
        "fifth": 5
      };
      show_from = show_from_levels[show_from];
      console.log('Show from level: '+show_from);

      $("#absolute_tree tr").removeClass('from_row');
      $("#absolute_tree tr:nth-child("+(show_from+1)+")").addClass('from_row');

      if (show_from > 1) {
        $("#show_first_when").prop('disabled', true);
      } else {
        $("#show_first_when").prop('disabled', false);
      }
      if (show_from > 2) {
        $("#show_second_when").prop('disabled', true);
      } else {
        $("#show_second_when").prop('disabled', false);
      }
      if (show_from > 3) {
        $("#show_third_when").prop('disabled', true);
      } else {
        $("#show_third_when").prop('disabled', false);
      }
      if (show_from > 4) {
        $("#show_fourth_when").prop('disabled', true);
      } else {
        $("#show_fourth_when").prop('disabled', false);
      }
      if (show_from > 5) {
        $("#show_fifth_when").prop('disabled', true);
      } else {
        $("#show_fifth_when").prop('disabled', false);
      }

      $("#absolute_tree select option").prop('disabled', false);
      // if (show_from == 1) {
      //   $("#show_first_when option[value=none]").prop('disabled', true);
      // } else if (show_from == 2) {
      //   $("#show_second_when option[value=none]").prop('disabled', true);
      // } else if (show_from == 3) {
      //   $("#show_third_when option[value=none]").prop('disabled', true);
      // } else if (show_from == 4) {
      //   $("#show_fourth_when option[value=none]").prop('disabled', true);
      // } else if (show_from == 5) {
      //   $("#show_fifth_when option[value=none]").prop('disabled', true);
      // }
      if ($("#show_first_when").val() != 'all') {
        $("#show_second_when option[value=all]").prop('disabled', true);
      }
      if ($("#show_second_when").val() != 'all') {
        $("#show_third_when option[value=all]").prop('disabled', true);
      }
      if ($("#show_third_when").val() != 'all') {
        $("#show_fourth_when option[value=all]").prop('disabled', true);
      }
      if ($("#show_fourth_when").val() != 'all') {
        $("#show_fifth_when option[value=all]").prop('disabled', true);
      }


      //  relative
      var show_current = $("#show_current").is(":checked");
      if (!show_current) {
        $("#relative_tree").find("input, select").prop('disabled', true);
        $("#relative_tree label").addClass('disabled');
      } else {
        $("#show_children, #show_siblings, #show_ancestors_when").prop('disabled', false);
        $("#relative_tree label").removeClass('disabled');

        if ($("#show_children").is(":checked")) {
          $("#show_grandchildren").prop('disabled', false);
          $("label[for=show_grandchildren]").removeClass('disabled');
        } else {
          $("#show_grandchildren").prop('disabled', true).prop('checked', false);
          $("label[for=show_grandchildren]").addClass('disabled');
        }
        if ($("#show_grandchildren").is(":checked")) {
          $("#show_descendents").prop('disabled', false);
          $("label[for=show_descendents]").removeClass('disabled');
        } else {
          $("#show_descendents").prop('disabled', true).prop('checked', false);
          $("label[for=show_descendents]").addClass('disabled');
        }
        if ($("#show_siblings").is(":checked")) {
          $("#show_siblings_when, #show_nephews").prop('disabled', false);
          $("label[for=show_nephews]").removeClass('disabled');
        } else {
          $("#show_siblings_when").prop('disabled', true);
          $("#show_nephews").prop('disabled', true).prop('checked', false);
          $("label[for=show_nephews]").addClass('disabled');
        }
        if ($("#show_nephews").is(":checked")) {
          $("#show_family").prop('disabled', false);
          $("label[for=show_family]").removeClass('disabled');
        } else {
          $("#show_family").prop('disabled', true);
          $("label[for=show_family").addClass('disabled');
        }
      }
    }

    update_navigation_options();
    $("form#navigation_form").find("input, select").change(update_navigation_options);
  });
});