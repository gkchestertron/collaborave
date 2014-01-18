class VersionsController < ApplicationController
	def create
    #this is the wrong way to do this - see projects controller for the right way
    @version = Version.new(version_params)
    track_diffs = params[:track_diffs]
    if @version.save
      if track_diffs
        track_diffs.each do |track_diff|
          track_diff_filters = track_diff[:filters]
          track_diff.delete(:filters)
          region_diffs = track_diff[:region_diffs]
          track_diff.delete(:region_diffs)
          new_track_diff = @version.track_diffs.new(track_diff)
          if new_track_diff.save
            if track_diff_filters
              track_diff_filters.each do |track_diff_filter|
                track_diff_filter_automations = track_diff_filter[:filter_automations]
                track_diff_filter.delete(:filter_automations)
                new_track_diff_filter = new_track_diff.filters.new(track_diff_filter)
                if new_track_diff_filter.save
                  if track_diff_filter_automations
                    track_diff_filter_automations.each do |track_diff_filter_automation|
                      new_track_diff_filter_automation = new_track_diff_filter.filter_automations.new(track_diff_filter_automation)
                      new_track_diff_filter_automation.save
                    end
                  end
                end
              end
            end
            if region_diffs
              region_diffs.each do |region_diff|
                region_diff_filters = region_diff[:filters]
                region_diff.delete(:filters)
                region_diffs = region_diff[:region_diffs]
                region_diff.delete(:region_diffs)
                new_region_diff = new_track_diff.region_diffs.new(region_diff)
                if new_region_diff.save
                  if region_diff_filters
                    region_diff_filters.each do |region_diff_filter|
                      region_diff_filter_automations = region_diff_filter[:filter_automations]
                      region_diff_filter.delete(:filter_automations)
                      new_region_diff_filter = new_region_diff.filters.new(region_diff_filter)
                      if new_region_diff_filter.save
                        if region_diff_filter_automations
                          region_diff_filter_automations.each do |region_diff_filter_automation|
                            new_region_diff_filter_automation = new_region_diff_filter.filter_automations.new(region_diff_filter_automation)
                            new_region_diff_filter_automation.save
                          end
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
     
      render :show
    else
      render json: @version.errors.full_messages
    end
  end
	
  def destroy
    @version = Version.find(params[:id])
    @version.destroy
    head :ok
  end

  def index
    @project = Project.find(params[:project_id])
    @versions = @project.versions
  end

  def show
    @version = Version.find(params[:id])
  end

  def update
    #this is the wrong way to do this - see projects controller for the right way
    @version = Version.find(params[:id])
    track_diffs = params[:track_diffs]
    if @version.update_attributes(version_params)
      if track_diffs
        track_diffs.each do |track_diff|
          track_diff_filters = track_diff[:filters]
          track_diff.delete(:filters)
          region_diffs = track_diff[:region_diffs]
          track_diff.delete(:region_diffs)

          if track_diff[:id]
            new_track_diff = TrackDiff.find(track_diff[:id])
          else 
            new_track_diff = @version.track_diffs.new(track_diff)
          end

          if new_track_diff.id 
            new_track_diff.update_attributes(track_diff)
          else
            new_track_diff.save
          end

          if track_diff_filters
            track_diff_filters.each do |track_diff_filter|
              track_diff_filter_automations = track_diff_filter[:filter_automations]
              track_diff_filter.delete(:filter_automations)

              if track_diff_filter[:id]
                new_track_diff_filter = Filter.find(track_diff_filter[:id])
              else 
                new_track_diff_filter = new_track_diff.filters.new(track_diff_filter)
              end

              if new_track_diff_filter.id
                new_track_diff_filter.update_attributes(track_diff_filter)
              else
                new_track_diff.save
              end

              if track_diff_filter_automations
                track_diff_filter_automations.each do |track_diff_filter_automation|

                  if track_diff_filter_automation[:id]
                    new_track_diff_filter_automation = FilterAutomation.find(track_diff_filter_automation[:id]) 
                  else 
                    new_region_diff_filter_automation = new_track_diff_filter.filter_automations.new(track_diff_filter_automation)
                  end

                  if new_track_diff_filter_automation.id
                    new_track_diff_filter_automation.update_attributes(track_diff_filter_automation)
                  else               
                    new_track_diff_filter_automation.save
                  end
                end
              end

            end
            
            if region_diffs
              region_diffs.each do |region_diff|
                region_diff_filters = region_diff[:filters]
                region_diff.delete(:filters)
                region_diffs = region_diff[:region_diffs]
                region_diff.delete(:region_diffs)

                if region_diff[:id] 
                  new_region_diff = RegionDiff.find(region_diff[:id]) 
                else 
                  new_region_diff = new_track_diff.region_diffs.new(region_diff)
                end

                if new_region_diff.id
                  new_region_diff.update_attributes(region_diff)
                else
                  new_region_diff.save
                end

                if region_diff_filters
                  region_diff_filters.each do |region_diff_filter|
                    region_diff_filter_automations = region_diff_filter[:filter_automations]
                    region_diff_filter.delete(:filter_automations)

                    if region_diff_filter[:id]
                      new_region_diff_filter = Filter.find(region_diff_filter[:id]) 
                    else 
                      new_region_diff_filter = new_region_diff.filters.new(region_diff_filter)
                    end

                    if new_region_diff_filter.id
                      new_region_diff_filter.update_attributes(region_diff_filter)
                    else
                      new_region_diff_filter.save
                    end

                    if region_diff_filter_automations
                      region_diff_filter_automations.each do |region_diff_filter_automation|

                        if region_diff_filter_automation[:id]
                          new_region_diff_filter_automation = FilterAutomation.find(region_diff_filter_automation[:id]) 
                        else 
                          new_region_diff_filter_automation = new_region_diff_filter.filter_automations.new(region_diff_filter_automation)
                        end

                        if new_region_diff_filter_automation.id
                          new_region_diff_filter_automation.update_attributes(region_diff_filter_automation)
                        else
                          new_region_diff_filter_automation.save
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
     
      render :show
    else
      render json: @version.errors.full_messages
    end
  end


  private

  	def version_params
    	params.require(:version).permit(:name, :collaborator_id, :project_id)
  	end
end