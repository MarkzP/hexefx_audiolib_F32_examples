/*
// ui:row
// ui:group name=Amp
slider1:0<0,8,1{OFF,Clean1,Clean2,Clean3,Clean4,Crunch1,Crunch2,Lead1,Lead2}>-Model
slider2:-66<-100,0,1>-Noise Gate
slider3:1.0<0.0,1.0,0.05>-Gain
slider4:1.0<0.0,1.0,0.05>-Bass
slider5:1.0<0.0,1.0,0.05>-Mid
slider6:1.0<0.0,1.0,0.05>-Treble
slider7:1.0<0.0,1.0,0.05>-Volume


// ui:row
// ui:group name=Reverb
slider20:0<0,1,0.05>-Dry/Wet Mix
slider21:0<0,1,0.05>-Time
slider22:0<0,1,0.05>-Bass Cut
slider23:0<0,1,0.05>-Treble Cut
slider24:0<0,1,1{ON,OFF}>-Reverb
// ui:row
// ui:group name=Delay
slider40:0<0,1,0.05>-Time
slider41:0<0,1,0.05>-Inertia
slider42:0<0,1,0.05>-Repeats
slider43:0<0,1,0.05>-Dry/Wet Mix
slider44:0<0,1,1{ON,OFF}>-Delay

// ui:row
// ui:group name=Delay Tone & Modulation
slider45:0<0,1,0.05>-Mod Rate
slider46:0<0,1,0.05>-Mod Depth
slider47:0<0,1,0.05>-Treble Cut
slider48:0<0,1,0.05>-Bass Cut
slider49:0<0,1,0.05>-Treble
slider50:0<0,1,0.05>-Bass
// ui:group name=Cabinet Emulator
slider60:6<0,10,1{Guitar1,Guitar2,Guitar3,Guitar4,Guitar5,Guitar6,Guitar7,Bass1,Bass2,Bass3,OFF}>-IR
slider61:0<0,1,1{ON,OFF}>-Doubler

https://geraintluff.github.io/jsfx-ui-lib/generate-ui.html

*/

desc: HexeFX Teensy4 Guitar Amp Modeler
import Dependencies/ui-lib.jsfx-inc
options:want_all_kb
in_pin: none
out_pin: none

@init
freemem = ui_setup(0);
theme = "default";
needs_slider_update = 1;
idx = 0;
non_amp_type_l = 20;
non_cab_type_l = 10;
non_doubler_l = 0;
non_rvb_state_l = 100;
cc_gate_thres_l = 0.7;
cc_gain_l = 1.0;
cc_bass_l = 1.0;
cc_mid_l = 1.0;
cc_treble_l = 1.0;
cc_vol_l = 1.0;
cc_rvb_mix_l = 0.5;
cc_rvb_time_l = 0.8;
cc_rvb_basscut_l = 0;
cc_rvb_treblecut_l = 0;
non_delay_state_l = 0;
cc_delay_time_l = 0.7;
cc_delay_inertia_l = 0;
cc_delay_repeats_l = 0.7;
cc_delay_mix_l = 0.4;
cc_delay_modrate_l = 0;
cc_delay_moddepth_l = 0;
cc_delay_treblecut_l = 0;
cc_delay_basscut_l = 0;
cc_delay_treble_l = 1.0;
cc_delay_bass_l = 1.0;

function slider_update_function() (
	needs_slider_update = 0;
	non_amp_type = slider1;
	non_cab_type = slider60;
	non_doubler = slider61;
	cc_gate_thres = slider2;
	cc_gain = slider3;
	cc_bass = slider4;
	cc_mid = slider5;
	cc_treble = slider6;
	cc_vol = slider7;
	cc_rvb_mix = slider20;
	cc_rvb_time = slider21;
	cc_rvb_basscut = slider22;
	cc_rvb_treblecut = slider23;
	non_rvb_state = slider24;
	non_delay_state = slider44;
	cc_delay_time = slider40;
	cc_delay_inertia = slider41;
	cc_delay_repeats = slider42;
	cc_delay_mix = slider43;
	cc_delay_modrate = slider45;
	cc_delay_moddepth = slider46;
	cc_delay_treblecut = slider47;
	cc_delay_basscut = slider48;
	cc_delay_treble = slider49;
	cc_delay_bass = slider50;
);

@gfx 720 650

// AUTOGENERATED UI //
// generated from slider section: https://github.com/geraintluff/jsfx-ui-lib
function gfx_ui_automate_slider(slidervar*, new_value) (
	slidervar !== new_value ? (
		slidervar = new_value;
		slider_automate(slidervar);
	);
	new_value;
);

function gfx_ui_layout_text(title, text) local(h) (
	h = max((ui_height() - 60)/2, ui_height()*0.2);
	ui_split_top(h);
		ui_text(title);
	ui_pop();
	ui_split_bottom(h);
		ui_text(text);
	ui_pop();
);

function gfx_ui_layout_title(title) (
	gfx_ui_layout_text(title, "");
);

function gfx_ui_slider1_to_text(value) (
	(value < 5 ? 
		(value < 3 ? (value < 2 ? (value === 0 ? "OFF" : "Clean1") : "Clean2") : (value === 3 ? "Clean3" : "Clean4"))
	 :      (value < 7 ? (value === 5 ? "Crunch1" : "Crunch2") : (value === 7 ? "Lead1" : "Lead2"))
	);
);

function gfx_ui_radio_option(value, optionValue, optionText) (
	ui_align(0.1, 0.5);
	ui_split_left(30);
		value = control_radio(value, optionValue);
	ui_pop();
	ui_click() ? value = optionValue;
	ui_text(optionText);
	value;
);

function gfx_ui_layout_textnumber(title, value, format) local(h) (
	h = max((ui_height() - 60)/2, ui_height()*0.2);
	ui_split_top(h);
		ui_text(title);
	ui_pop();
	ui_split_bottom(h);
		value = control_hidden_textnumber(value, value*1.00000001, format);
	ui_pop();
	value;
);

function gfx_ui_dial_rounded(slidervar*, low, high, bias, default, step) (
	slidervar != floor(slidervar._ui_gen_float/step + 0.5)*step ? slidervar._ui_gen_float = slidervar;
	slidervar._ui_gen_float = control_dial(slidervar._ui_gen_float, low, high, bias, default);
	gfx_ui_automate_slider(slidervar, floor(slidervar._ui_gen_float/step + 0.5)*step);
);

function gfx_ui_slider60_to_text(value) (
	(value < 6 ? 
		(value < 3 ? (value < 2 ? (value === 0 ? "Guitar1" : "Guitar2") : "Guitar3") : (value < 5 ? (value === 3 ? "Guitar4" : "Guitar5") : "Guitar6"))
	 :      (value < 9 ? (value < 8 ? (value === 6 ? "Guitar7" : "Bass1") : "Bass2") : (value === 9 ? "Bass3" : "OFF"))
	);
);

control_start("main", theme);
control_navbar("HexeFX Teensy4 Guitar Amp Emulator");
ui_screen() === "main" ? (
	ui_split_topratio(1/4); // 4 rows
		ui_split_leftratio(7/7);
			// row 1, group 1
			control_group("Amp");
			ui_split_leftratio(1/7);
				gfx_ui_layout_text("Model", gfx_ui_slider1_to_text(slider1));
				ui_push_widthtext("edit");
					ui_push_heighttext("edit");
						control_button("edit") ? ui_screen_open("edit-slider1");
					ui_pop();
				ui_pop();
			ui_split_next();
				gfx_ui_automate_slider(slider2, gfx_ui_layout_textnumber("Noise Gate", slider2, "%i"));
				gfx_ui_dial_rounded(slider2, 0, 2, 0, 0.76, 1);
			ui_split_next();
				gfx_ui_automate_slider(slider3, gfx_ui_layout_textnumber("Gain", slider3, "%.2f"));
				gfx_ui_dial_rounded(slider3, 0.0, 1.0, 0, 1.0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider4, gfx_ui_layout_textnumber("Bass", slider4, "%.2f"));
				gfx_ui_dial_rounded(slider4, 0.0, 1.0, 0, 1.0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider5, gfx_ui_layout_textnumber("Mid", slider5, "%.2f"));
				gfx_ui_dial_rounded(slider5, 0.0, 1.0, 0, 1.0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider6, gfx_ui_layout_textnumber("Treble", slider6, "%.2f"));
				gfx_ui_dial_rounded(slider6, 0.0, 1.0, 0, 1.0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider7, gfx_ui_layout_textnumber("Volume", slider7, "%.2f"));
				gfx_ui_dial_rounded(slider7, 0.0, 1.0, 0, 1.0, 0.05);
			ui_pop();
		ui_pop();
	ui_split_next();
		ui_split_leftratio(5/5);
			// row 2, group 1
			control_group("Reverb");
			ui_split_leftratio(1/5);
				gfx_ui_automate_slider(slider20, gfx_ui_layout_textnumber("Dry/Wet Mix", slider20, "%.2f"));
				gfx_ui_dial_rounded(slider20, 0.0, 1.0, 0.0, 0.5, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider21, gfx_ui_layout_textnumber("Time", slider21, "%.2f"));
				gfx_ui_dial_rounded(slider21, 0.0, 1.0, 0, 0.7, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider22, gfx_ui_layout_textnumber("Bass Cut", slider22, "%.2f"));
				gfx_ui_dial_rounded(slider22, 0.0, 1.0, 0, 0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider23, gfx_ui_layout_textnumber("Treble Cut", slider23, "%.2f"));
				gfx_ui_dial_rounded(slider23, 0.0, 1.0, 0, 0, 0.05);
			ui_split_next();
				gfx_ui_layout_text("Reverb", slider24 ? "ON" : "OFF");
				ui_pad(-1, 0);
				gfx_ui_automate_slider(slider24, control_switch(slider24));
			ui_pop();
		ui_pop();
	ui_split_next();
		ui_split_leftratio(5/5);
			// row 3, group 1
			control_group("Delay");
			ui_split_leftratio(1/5);
				gfx_ui_automate_slider(slider40, gfx_ui_layout_textnumber("Time", slider40, "%.2f"));
				gfx_ui_dial_rounded(slider40, 0.0, 1.0, 0, 0.5, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider41, gfx_ui_layout_textnumber("Inertia", slider41, "%.2f"));
				gfx_ui_dial_rounded(slider41, 0.0, 1.0, 0, 0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider42, gfx_ui_layout_textnumber("Repeats", slider42, "%.2f"));
				gfx_ui_dial_rounded(slider42, 0, 1, 0, 0.5, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider43, gfx_ui_layout_textnumber("Dry/Wet Mix", slider43, "%.2f"));
				gfx_ui_dial_rounded(slider43, 0, 1, 0, 0.3, 0.05);
			ui_split_next();
				gfx_ui_layout_text("Delay", slider44 ? "ON" : "OFF");
				ui_pad(-1, 0);
				gfx_ui_automate_slider(slider44, control_switch(slider44));
			ui_pop();
		ui_pop();
	ui_split_next();
		ui_split_leftratio(6/8);
			// row 4, group 1
			control_group("Delay Tone & Modulation");
			ui_split_leftratio(1/6);
				gfx_ui_automate_slider(slider45, gfx_ui_layout_textnumber("Mod Rate", slider45, "%.2f"));
				gfx_ui_dial_rounded(slider45, 0, 1, 0, 0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider46, gfx_ui_layout_textnumber("Mod Depth", slider46, "%.2f"));
				gfx_ui_dial_rounded(slider46, 0, 1, 0, 0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider47, gfx_ui_layout_textnumber("Treble Cut", slider47, "%.2f"));
				gfx_ui_dial_rounded(slider47, 0, 1, 0, 0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider48, gfx_ui_layout_textnumber("Bass Cut", slider48, "%.2f"));
				gfx_ui_dial_rounded(slider48, 0, 1, 0, 0, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider49, gfx_ui_layout_textnumber("Treble", slider49, "%.2f"));
				gfx_ui_dial_rounded(slider49, 0, 1, 0, 1, 0.05);
			ui_split_next();
				gfx_ui_automate_slider(slider50, gfx_ui_layout_textnumber("Bass", slider50, "%.2f"));
				gfx_ui_dial_rounded(slider50, 0, 1, 0, 1, 0.05);
			ui_pop();
		ui_pop();
		ui_split_leftratio(2/2);
			// row 4, group 2
			control_group("Cabinet Emulator");
			ui_split_leftratio(1/2);
				gfx_ui_layout_text("IR", gfx_ui_slider60_to_text(slider60));
				ui_push_widthtext("edit");
					ui_push_heighttext("edit");
						control_button("edit") ? ui_screen_open("edit-slider60");
					ui_pop();
				ui_pop();
			ui_split_next();
				gfx_ui_layout_text("Doubler", slider61 ? "ON" : "OFF");
				ui_pad(-1, 0);
				gfx_ui_automate_slider(slider61, control_switch(slider61));
			ui_pop();
		ui_pop();
	ui_pop();
) : ui_screen() === "edit-slider1" ? (
	control_dialog("Model", 220, 270, "done", -1);
	
	ui_split_topratio(1/9); // 9 rows
	_ui_gen_index = 0;
	while (_ui_gen_index < 9) (
		gfx_ui_automate_slider(slider1, gfx_ui_radio_option(slider1, _ui_gen_index, gfx_ui_slider1_to_text(_ui_gen_index)));
		_ui_gen_index += 1;
		ui_split_next();
	);
	ui_pop();
) : ui_screen() === "edit-slider60" ? (
	control_dialog("IR", 220, 330, "done", -1);
	
	ui_split_topratio(1/11); // 11 rows
	_ui_gen_index = 0;
	while (_ui_gen_index < 11) (
		gfx_ui_automate_slider(slider60, gfx_ui_radio_option(slider60, _ui_gen_index, gfx_ui_slider60_to_text(_ui_gen_index)));
		_ui_gen_index += 1;
		ui_split_next();
	);
	ui_pop();
) : control_system();
ui_interacted() ? needs_slider_update = 1;
// END OF AUTOGENERATED UI //

@block
needs_slider_update ? slider_update_function();
idx <= 16 ? (
    idx = idx + 1;
) : (
    idx = 0;

    non_amp_type_l != non_amp_type ? (
        non_amp_type_l = non_amp_type;
        midisend(0, $x90, 40+non_amp_type, 127);
    );
    non_cab_type_l != non_cab_type ? (
        non_cab_type_l = non_cab_type;
        midisend(0, $x90, 6+non_cab_type,127);
    );
    non_doubler_l != non_doubler ? (
        non_doubler_l = non_doubler;
		non_doubler ? non_val = 36 : non_val = 35;
        midisend(0, $x90, non_val, 127);
    );
	non_delay_state_l != non_delay_state ? (
		non_delay_state_l = non_delay_state;
		non_delay_state ? non_val = 34 : non_val = 33;
		midisend(0, $x90, non_val, 127);
	);
	non_rvb_state_l != non_rvb_state ? (
		non_rvb_state_l = non_rvb_state;
		non_rvb_state ? non_val = 32 : non_val = 31;
		midisend(0, $x90, non_val, 127);
	);
    cc_gate_thres_l != cc_gate_thres ? (
        cc_gate_thres_l = cc_gate_thres;
        midisend(0, $xB0, 80, cc_gate_thres*127);
    );
    cc_gain_l != cc_gain ? (
        cc_gain_l = cc_gain;
        midisend(0, $xB0, 84, cc_gain*127);
    );
    cc_bass_l != cc_bass ? (
        cc_bass_l = cc_bass;
        midisend(0, $xB0, 81, cc_bass*127);
    );
    cc_mid_l != cc_mid ? (
        cc_mid_l = cc_mid;
        midisend(0, $xB0, 82, cc_mid*127);
    );
    cc_treble_l != cc_treble ? (
        cc_treble_l = cc_treble;
        midisend(0, $xB0, 83, cc_treble*127);
    );
    cc_vol_l != cc_vol ? (
        cc_vol_l = cc_vol;
        midisend(0, $xB0, 84, cc_vol*127);
    );
    cc_rvb_mix_l != cc_rvb_mix ? (
        cc_rvb_mix_l = cc_rvb_mix;
        midisend(0, $xB0, 86, cc_rvb_mix*127);
    );
    cc_rvb_time_l != cc_rvb_time ? (
        cc_rvb_time_l = cc_rvb_time;
        midisend(0, $xB0, 87, cc_rvb_time*127);
    );
    cc_rvb_basscut_l != cc_rvb_basscut ? (
        cc_rvb_basscut_l = cc_rvb_basscut;
        midisend(0, $xB0, 88, cc_rvb_basscut*127);
    );
    cc_rvb_treblecut_l != cc_rvb_treblecut ? (
        cc_rvb_treblecut_l = cc_rvb_treblecut;
        midisend(0, $xB0, 87, cc_rvb_treblecut*127);
    );

    cc_delay_time_l != cc_delay_time ? (
        cc_delay_time_l = cc_delay_time;
        midisend(0, $xB0, 1, cc_delay_time*127);
    );
    cc_delay_inertia_l != cc_delay_inertia ? (
        cc_delay_inertia_l = cc_delay_inertia;
        midisend(0, $xB0, 2, cc_delay_inertia*127);
    );
    cc_delay_repeats_l != cc_delay_repeats ? (
        cc_delay_repeats_l = cc_delay_repeats;
        midisend(0, $xB0, 3, cc_delay_repeats*127);
    );
    cc_delay_mix_l != cc_delay_mix ? (
        cc_delay_mix_l = cc_delay_mix;
        midisend(0, $xB0, 4, cc_delay_mix*127);
    );
    cc_delay_modrate_l != cc_delay_modrate ? (
        cc_delay_modrate_l = cc_delay_modrate;
        midisend(0, $xB0, 5, cc_delay_modrate*127);
    );
    cc_delay_moddepth_l != cc_delay_moddepth ? (
        cc_delay_moddepth_l = cc_delay_moddepth;
        midisend(0, $xB0, 6, cc_delay_moddepth*127);
    );
    cc_delay_treblecut_l != cc_delay_treblecut ? (
        cc_delay_treblecut_l = cc_delay_treblecut;
        midisend(0, $xB0, 7, cc_delay_treblecut*127);
    );
    cc_delay_basscut_l != cc_delay_basscut ? (
        cc_delay_basscut_l = cc_delay_basscut;
        midisend(0, $xB0, 8, cc_delay_basscut*127);
    );
    cc_delay_treble_l != cc_delay_treble ? (
        cc_delay_treble_l = cc_delay_treble;
        midisend(0, $xB0, 9, cc_delay_treble*127);
    );
    cc_delay_bass_l != cc_delay_bass ? (
        cc_delay_bass_l = cc_delay_bass;
        midisend(0, $xB0, 10, cc_delay_bass*127);
    );
);