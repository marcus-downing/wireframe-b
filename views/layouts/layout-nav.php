<?php get_header() ?>
<div class="container">
  <div class="row">
    <div class="col-sm-3">
      <?php get_sidebar('left') ?>
    </div>
    <div class="col-sm-9">
      <%= content() %>
    </div>
  </div>
</div>
<?php get_footer() ?>