# viewer/views.py (no changes needed here, but included for completeness)
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.urls import reverse

def panoramic_view(request):
    visits = request.session.get('visits', 0)
    request.session['visits'] = visits + 1
    show_ads = visits >= 10 and not request.user.is_authenticated
    return render(request, 'panoramic_view.html', {'show_ads': show_ads, 'user': request.user})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"You are now logged in as {username}.")
                next_url = request.GET.get('next', reverse('panoramic_view'))
                return redirect(next_url)
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
        #Always return to panoramic view, to possibly show the ads, regardless of whether you are logged in
        return redirect(reverse('panoramic_view'))
    else:
        form = AuthenticationForm()

    return render(request, 'base.html', {'login_form': form})

def logout_view(request):
    logout(request)
    #Always return to panoramic view, to possibly show the ads, regardless of whether you are logged in
    return redirect(reverse('panoramic_view'))
