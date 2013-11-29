---
layout: post
title: Windows Store apps - Circular animation for Progress control (XAML/C#)
lang: eng
categories: [windows store apps]
tags : [windows store apps, c#/xaml, ui]
---
{% include JB/setup %}

In this post, I'm going to show you how you can create a circular animation in a metro style application (XAML/C#). In my case, we needed to animate a circular progress arc that fires when the user waits for some process to complete. In this case, we're going to use a full 360° animation, but take into account that you can go up to any angle you want (if that's your scenario).

> **Note:** I developed a sample so you can test this approach, you can find it [here](https://github.com/nanovazquez/metro-arc-animation-sample). 
> Feel free to use it in your app, modify it (or do whatever you want).

## The XAML

We animate two [ArcSegments](http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.media.arcsegment) inside a [Path](http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.shapes.path.aspx). The **Data** attribute contains the value of the initial values (position zero).

{% highlight xml %}

<Grid Grid.Row="0" HorizontalAlignment="Center" VerticalAlignment="Center">
	<Path x:Name="progressPath" Stroke="Gold" StrokeThickness="5" 
	      HorizontalAlignment="Center" VerticalAlignment="Center" Height="305" Width="305"
	      Data="m 150,0 A 150,0 0 0 0 150,0 A 150,150 0 0 0 150,0" />
</Grid>

{% endhighlight %}

## The code (C#)

I think the code speaks for itself: we create a storyboard to animate the **Data** attribute. Given an angle, we calculate the point in the circle using **sin** and **cos** (math rocks!) and create a [DiscreteObjectKeyFrame](http://msdn.microsoft.com/en-us/library/system.windows.media.animation.discreteobjectkeyframe.aspx) to animate the transition. We do this for all angles between 0 and the final angle (with 1° steps). Lastly, the first ArcSegment is for the angles between 0 a 180, and the second are for the rest. 

{% highlight csharp %}

public static void AnimatePath(Windows.UI.Xaml.Shapes.Path progressPath, double radius, Point initialPoint, double finalAngle = 180, double timeStep = 0.01)
{
    var storyboard = new Storyboard();

    var progressAnimation = new ObjectAnimationUsingKeyFrames();
    Storyboard.SetTarget(progressAnimation, progressPath);
    Storyboard.SetTargetProperty(progressAnimation, "(Path.Data)");

    Point center = new Point(radius, radius);
    for (int i = 0; i <= finalAngle; i++)
    {
        var discreteObjectKeyFrame = new DiscreteObjectKeyFrame();
        discreteObjectKeyFrame.KeyTime = KeyTime.FromTimeSpan(TimeSpan.FromSeconds(i * timeStep));

        // create points for each ArcSegment
        Point firstArcPoint = new Point(radius, 0);
        Point secondArcPoint = new Point(radius, 0);

        if (i < 180)
        {
            // calculate a new point of the first ArcSegment
            firstArcPoint.X = Math.Cos(Math.PI * (270 - i) / 180.0) * radius + center.X;
            firstArcPoint.Y = Math.Sin(Math.PI * (270 - i) / 180.0) * radius + center.Y;
            secondArcPoint = firstArcPoint;
        }
        else
        {
            // leave the first ArcSegment static and calculate a new point of the second
            firstArcPoint = new Point() { X = radius, Y = radius * 2 };
            secondArcPoint.X = Math.Cos(Math.PI * (270 - i) / 180.0) * radius + center.X;
            secondArcPoint.Y = Math.Sin(Math.PI * (270 - i) / 180.0) * radius + center.Y;
        }

        // for instance, a complete circle with a radius of 150: "m 150,0 A 150,150 0 0 0 150,300 A 150,150 0 0 0 150,0"
        string dataValue = "m {0},{1} A {2},{2} 0 0 0 {3},{4} A {2},{2} 0 0 0 {5},{6}";
        discreteObjectKeyFrame.Value = string.Format(dataValue, initialPoint.X, initialPoint.Y, radius, firstArcPoint.X, firstArcPoint.Y, secondArcPoint.X, secondArcPoint.Y);
        progressAnimation.KeyFrames.Add(discreteObjectKeyFrame);
    }   

    storyboard.Children.Add(progressAnimation);
    storyboard.Begin();
}

{% endhighlight %}

Below you can find a video with the result:

<iframe width="560" height="315" src="http://www.youtube.com/embed/BRTddeMuLpY" frameborder="0" allowfullscreen></iframe>

And that's it! Remember that you can check out the code [here](https://github.com/nanovazquez/metro-arc-animation-sample)

> **Note**: for a smoother animation, you can use 0.5° steps (or less). I decided to leave it in 1° here just to make the code simpler.