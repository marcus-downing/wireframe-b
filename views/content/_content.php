<main role='main'>
<?php
$article = is_singular() && !is_null($post);
if ($article) { ?><article id='post-<?php the_ID() ?>'><?php } ?>
<div id='content'>
<%= inner_content() %>
</div>
<?php if ($article) { ?></article><?php } ?>
</main>
