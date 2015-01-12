<?php get_header() ?>
<div class="container">
  <div class="row">
    <div class="col-sm-4 col-md-3">
      <?php get_sidebar('left') ?>
    </div>
    <div class="col-sm-8 col-md-9">
      <%= content() %>
    </div>
  </div>
</div>
<?php get_footer() ?>