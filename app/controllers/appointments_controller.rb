class AppointmentsController < ApplicationController

  def index
    @appointments = Appointment.order('appt_time ASC')
    @appointment = Appointment.new

    #render json: @appointments

    respond_to do |format|
      format.json {render json: @appointments }
      format.html
    end

  end

  def show
    @appointment  = Appointment.find(params[:id])
    render json: @appointment
  end

  def update
    @appointment = Appointment.find(params[:id])
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def edit
    render :index
  end

  private
  def appointment_params
    params.require(:appointment).permit(:title, :appt_time)
  end
end
