class FilterAutomationsController < ApplicationController
	
	def create
		@filter_automation = FilterAutomation.new(filter_automation_params)
		if @filter_automation.save
			render json: @filter_automation
		else
			render json: @filter_automation.errors.full_messages, status: 422
		end
	end

	def destroy
		FilterAutomation.find(params[:id]).destroy
		head :ok
	end

	def index
		@filter = Filter.find(params[:filter_id])
		@filter_automations = @filter.filter_automations
	end

	def show
		@filter_automation = FilterAutomation.find(params[:id])
	end

	def update
		@filter_automation = FilterAutomation.find(params[:id])
		if @filter_automation.update_attributes(filter_automation_params)
			head :ok
		else
			render json: @filter_automation.errors.full_messages, status: 402
		end
	end

	private

  	def filter_automation_params
  		params.require(:filter_automation).permit(:method_name, :args, :filter_id)
  	end
end
