FROM centos:7

ARG UID

ARG GID

WORKDIR /app

RUN yum update -y

RUN yum install -y epel-release

RUN yum install -y nodejs

RUN yum install -y npm

RUN groupadd usericus -g $GID -f

RUN useradd -u $UID -g $GID centosuser

RUN mkdir -p /centos-user-folder/app
RUN chown -R $UID:$GID /centos-user-folder

COPY . /centos-user-folder/app

WORKDIR /app

COPY centos-integration-entrypoint-script.sh .

ENTRYPOINT [ "sh", "centos-integration-entrypoint-script.sh" ]
