sprites:
	PYTHONPATH="${PYTHONPATH}:./vendor/glue/package/lib/python2.7/site-packages/" ./vendor/glue/package/bin/glue \
		 --project --cachebuster --crop \
		./sprites ./static/images/sprites --scss
	mv ./static/images/sprites/*.scss ./static/css/sprites/
.PHONY: sprites