help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install app locally
	yarn

start: ## Start the app locally
	yarn dev

build: ## Build the app for production
	yarn build


start-server: ## Start the app locally
	yarn start-server
