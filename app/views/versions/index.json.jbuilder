json.array! @versions do |version|
	json.id version.id
	json.name version.name 
	json.project_id version.project_id
	json.collaborator_id version.collaborator_id
	
	json.track_diffs do
		json.array! version.track_diffs do |track_diff|
			json.id track_diff.id
			json.track_id track_diff.track_id
			json.version_id track_diff.version_id
			
			json.region_diffs do 
				json.array! track_diff.region_diffs do |region_diff|
					json.id region_diff.id
					json.track_diff_id region_diff.track_diff_id
					json.region_id region_diff.region_id
					json.start_time region_diff.start_time

					json.filters do
						json.array! region_diff.filters do |filter|
							json.name filter.name
							json.track_id filter.track_id
							json.settings filter.settings
							json.track_diff_id filter.track_diff_id
							json.signal_path_order filter.signal_path_order
							json.filter_type filter.filter_type
							json.region_id filter.region_id
							json.region_diff_id filter.region_diff_id
							json.id filter.id

							json.filter_automations do
								json.array! filter.filter_automations do |filter_automation|
									json.id filter_automation.id
									json.method_name filter_automation.method_name
									json.args filter_automation.args
									json.filter_id filter_automation.filter_id
								end
							end	
						end
					end
				end
			end

			json.filters do
				json.array! track_diff.filters do |filter|
					json.name filter.name
					json.track_id filter.track_id
					json.settings filter.settings
					json.track_diff_id filter.track_diff_id
					json.signal_path_order filter.signal_path_order
					json.filter_type filter.filter_type
					json.region_id filter.region_id
					json.region_diff_id filter.region_diff_id
					json.id filter.id

					json.filter_automations do
						json.array! filter.filter_automations do |filter_automation|
							json.id filter_automation.id
							json.method_name filter_automation.method_name
							json.args filter_automation.args
							json.filter_id filter_automation.filter_id
						end
					end	
				end
			end
		end
	end
end