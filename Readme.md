# Conveyor Wear Monitoring Dashboard

ENV VARS:
* BELT_TOPIC : *the rabbit topic that the sites publish to*
* DATABASE_URL : *the database connection string (Heroku provides this in production)*
* AMQP_URL : *the rabbitMQ server uri* 
* JWT_SECRET : *the random token that we use to sign JWTs*
